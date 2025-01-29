import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gift } from 'src/schemas/gift.schema';
import * as cheerio from 'cheerio';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';
import { ConfigService } from '@nestjs/config';

type AmazonProduct = {
  id: string | undefined;
  name: string | undefined;
  searchTerm: string | undefined;
  priceInCents: number;
  imageUrl: string | undefined;
  productUrl: string;
  description: string;
  isActive: boolean;
};

@Injectable()
export class GiftsService {
  private wishlistUrl: string;
  private telegramNotificationChannelId: string;
  constructor(
    @InjectModel(Gift.name) private giftModel: Model<Gift>,

    @Inject(forwardRef(() => TelegramBotService))
    private readonly telegramBotService: TelegramBotService,
    private readonly configService: ConfigService,
  ) {
    this.wishlistUrl = this.configService.get<string>(
      'AMAZON_WISHLIST_URL',
      '',
    );
    this.telegramNotificationChannelId = this.configService.get<string>(
      'TELEGRAM_NOTIFICATION_CHANNEL_ID',
      '',
    );
    // const NODE_ENV = this.configService.get<string>('NODE_ENV', 'production');

    // if (NODE_ENV === 'local') {
    this.monitorAndUpdateGiftListRecursive(180_000);
    // }
  }

  private createSearchParam = (itemName: string) =>
    `&itemSearchKeyword=${encodeURIComponent(itemName)}`;

  public async getGifts({
    limit,
    filter = {},
  }: {
    limit: number;
    filter?: Partial<AmazonProduct>;
  }): Promise<Gift[]> {
    const gifts = await this.giftModel.find(filter).limit(limit);
    return gifts;
  }

  async saveGift(Gift: AmazonProduct) {
    const createdGift = new this.giftModel(Gift);
    return createdGift.save();
  }

  public async searchKeywordForNewProducts(keyword: string) {
    const url = `${this.wishlistUrl}${this.createSearchParam(keyword)}`;
    const items = await this.scrapeList({ url, shouldGetBetterImage: true });

    const savedGifts = await this.getGifts({ limit: 1000 });
    const alreadySavedIds = savedGifts.map((item) => item.id);
    const newProducts: AmazonProduct[] = [];
    items.forEach((item) => {
      if (alreadySavedIds.includes(item.id as string)) {
        return;
      }
      newProducts.push(item);
      this.saveGift(item);
    });

    return newProducts;
  }

  public async populateGiftsDb(url: string) {
    const savedGifts = await this.getGifts({ limit: 1000 });
    const alreadySavedIds = savedGifts.map((item) => item.id);

    const items = await this.scrapeList({
      url,
      shouldGetBetterImage: true,
    });

    items.forEach((item) => {
      if (alreadySavedIds.includes(item.id as string)) {
        return;
      }

      this.saveGift(item);
    });
  }

  private async monitorAndUpdateGiftListRecursive(interval: number) {
    await this.monitorAndUpdateGiftList();
    setTimeout(
      () => this.monitorAndUpdateGiftListRecursive(interval),
      interval,
    );
  }

  public async monitorAndUpdateGiftList() {
    const savedGifts = await this.getGifts({
      limit: 1000,
      filter: { isActive: true },
    });

    for (let i = 0; i < savedGifts.length; i++) {
      const currentGift = savedGifts[i];

      const url = `${this.wishlistUrl}${this.createSearchParam(currentGift.searchTerm)}`;
      const [item] = await this.scrapeList({ url });
      console.debug(
        '🚀 ~ GiftsService ~ monitorAndUpdateGiftList ~ item:',
        item,
      );

      if (!item) {
        currentGift.isActive = false;
        console.debug(
          '🚀 ~ GiftsService ~ monitorAndUpdateGiftList ~ setting currentGift.isActive: false',
        );
        await this.telegramBotService.sendMessage({
          chatId: this.telegramNotificationChannelId,
          text: `O seguinte item foi retirado da lista:\n\n${JSON.stringify(currentGift, null, 2)}`,
        });
        await this.giftModel.findOneAndUpdate(
          { id: currentGift.id },
          currentGift,
        );
        continue;
      }

      if (
        item.priceInCents !== currentGift.priceInCents ||
        item.name !== currentGift.name
      ) {
        console.debug(
          '🚀 ~ GiftsService ~ monitorAndUpdateGiftList ~ new item.priceInCents:',
          item.priceInCents,
        );
        console.debug(
          '🚀 ~ GiftsService ~ monitorAndUpdateGiftList ~ new item.name:',
          item.name,
        );
        currentGift.name = item.name as string;
        currentGift.priceInCents = item.priceInCents;
        await this.giftModel.findOneAndUpdate(
          { id: currentGift.id },
          currentGift,
        );
        continue;
      }
    }
  }

  public async getBetterProductImageUrl(
    url: string,
  ): Promise<string | undefined> {
    const selector = await cheerio.fromURL(url);
    const body = selector('body');
    const imageUrl = body.find(`#imgTagWrapperId > img`).attr('src');
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
      imageUrl: betterImageUrl || item.imageUrl,
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
