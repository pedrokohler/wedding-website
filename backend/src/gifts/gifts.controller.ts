import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}
  @Get()
  getGifts(@Query('limit', ParseIntPipe) limit: number) {
    return this.giftsService.getGifts({ limit });
  }

  @Post()
  monitorGifts() {
    return this.giftsService.monitorAndUpdateGiftList();
  }
}
