import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Gift, GiftDocument } from 'src/schemas/gift.schema';
import * as cheerio from 'cheerio';
import { ConfigService } from '@nestjs/config';

type AmazonProduct = {
  id?: string;
  name?: string;
  searchTerm?: string;
  priceInCents: number;
  imageUrl?: string;
  productUrl: string;
  description: string;
  isActive: boolean;
  manualOrdering?: number;
};

export enum SortFields {
  'name:asc' = 'name',
  'priceInCents:asc' = 'priceInCents',
  'manualOrdering:asc' = 'manualOrdering',
  'name:desc' = '-name',
  'priceInCents:desc' = '-priceInCents',
  'manualOrdering:desc' = '-manualOrdering',
}

@Injectable()
export class GiftsService {
  private wishlistUrl: string;
  constructor(
    @InjectModel(Gift.name) private giftModel: Model<Gift>,
    private readonly configService: ConfigService,
  ) {
    this.wishlistUrl = this.configService.get<string>(
      'AMAZON_WISHLIST_URL',
      '',
    );
  }

  private createSearchParam = (itemName: string) =>
    `&itemSearchKeyword=${encodeURIComponent(itemName)}`;

  public async getPaginatedGifts({
    limit = 20,
    skip = 0,
    filter = {},
    sort,
  }: {
    limit?: number;
    skip?: number;
    filter?: Partial<AmazonProduct>;
    sort?: SortFields;
  }) {
    const items = this.getGifts({ limit, skip, filter, sort });
    const totalItems = await this.giftModel.countDocuments(filter);
    const currentPage = Math.floor(skip / limit);
    const totalPages = Math.ceil(totalItems / limit) - 1;
    const nextPage = currentPage >= totalPages ? null : currentPage + 1;

    return {
      items: Array.isArray(items) ? items : [],
      currentPage,
      totalPages,
      nextPage,
    };
  }

  public async getGifts({
    limit = 20,
    skip = 0,
    filter = {},
    sort,
  }: {
    limit?: number;
    skip?: number;
    filter?: FilterQuery<GiftDocument>;
    sort?: SortFields;
  }): Promise<Gift[]> {
    let query = this.giftModel.find(filter);

    if (sort) {
      query = query.sort(sort);
    }

    if (skip) {
      query = query.skip(skip);
    }

    const gifts = await query.limit(limit);
    return gifts;
  }

  async saveGift(Gift: AmazonProduct) {
    const createdGift = new this.giftModel(Gift);
    return createdGift.save();
  }

  public async searchKeywordForNewProducts(keyword: string) {
    const url = `${this.wishlistUrl}${this.createSearchParam(keyword)}`;
    const items = await this.scrapeList({ url, shouldGetBetterImage: true });

    const savedGifts = await this.getGifts({
      limit: 1000,
      sort: SortFields['manualOrdering:desc'],
    });

    const alreadySavedIds = savedGifts.map((item) => item.id);
    const newProducts: AmazonProduct[] = [];
    let lastOrderingIndex = savedGifts[0].manualOrdering;
    items.forEach((item) => {
      if (alreadySavedIds.includes(item.id as string)) {
        return;
      }
      lastOrderingIndex++;
      item.manualOrdering = lastOrderingIndex;
      newProducts.push(item);
      this.saveGift(item);
    });

    return newProducts;
  }

  public async getBetterProductImageUrl(
    url: string,
  ): Promise<string | undefined> {
    const result = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30',
      },
    }).then((res) => res.text());
    const selector = cheerio.load(result);
    const body = selector('body');
    const imageTag = body.find(`#landingImage`);
    const imageUrl = imageTag.attr('src');
    return imageUrl;
  }

  public extractProductInformation({
    index,
    selector,
  }: {
    index: number;
    selector: cheerio.CheerioAPI;
  }): AmazonProduct {
    const body = selector('body');
    const item = body.find(`#g-items > li:nth-child(${index})`);
    const id = item.attr('data-itemid');

    const name = item.find(`#itemName_${id}`).attr('title');
    const priceInCents = item
      .find(`#itemPrice_${id} > .a-offscreen`)
      .text()
      .replace(/\s/g, '')
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '');

    const imageUrl = item.find(`#itemImage_${id} > a > img`).attr('src');

    const productUrl =
      'https://amazon.com.br' + item.find(`#itemName_${id}`).attr('href');

    return {
      id,
      name,
      searchTerm: name,
      priceInCents: Number(priceInCents),
      imageUrl,
      productUrl,
      description: '',
      isActive: true,
    };
  }

  private async getItemWithCorrectImage({
    shouldGetBetterImage,
    item,
  }: {
    shouldGetBetterImage: boolean;
    item: AmazonProduct;
  }) {
    if (!shouldGetBetterImage) {
      return item;
    }

    const betterImageUrl = await this.getBetterProductImageUrl(item.productUrl);
    return {
      ...item,
      imageUrl: betterImageUrl ?? item.imageUrl,
    };
  }

  public async scrapeList({
    url,
    shouldGetBetterImage = false,
  }: {
    url: string;
    shouldGetBetterImage?: boolean;
  }): Promise<AmazonProduct[]> {
    const result = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30',
      },
    }).then((res) => res.text());
    const selector = cheerio.load(result);
    const items: AmazonProduct[] = [];

    for (let i = 1; i < 20; i++) {
      const item = this.extractProductInformation({ selector, index: i });
      if (item.id) {
        const itemWithCorrectImage = await this.getItemWithCorrectImage({
          shouldGetBetterImage,
          item,
        });
        items.push(itemWithCorrectImage);
      }
    }
    return items;
  }
}
