import {
  Controller,
  Get,
  ParseEnumPipe,
  ParseIntPipe,
  // Post,
  Query,
} from '@nestjs/common';
import { GiftsService, SortFields } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}
  @Get()
  getGifts(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('sort', new ParseEnumPipe(SortFields, { optional: true }))
    sort?: SortFields,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ) {
    return this.giftsService.getPaginatedGifts({ limit, sort, skip });
  }

  // @Post()
  // monitorGifts() {
  //   return this.giftsService.monitorAndUpdateGiftList();
  // }

  // @Get('order')
  // resetGiftsOrder() {
  //   return this.giftsService.resetGiftsOrder();
  // }
}
