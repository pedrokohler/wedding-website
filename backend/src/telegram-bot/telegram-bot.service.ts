import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RawApi, Bot } from 'grammy';
import { Other } from 'grammy/out/core/api';
import { GiftsService } from 'src/gifts/gifts.service';

@Injectable()
export class TelegramBotService {
  private bot: Bot;
  constructor(
    @Inject(forwardRef(() => GiftsService))
    private readonly giftsService: GiftsService,
    private readonly configService: ConfigService,
  ) {
    const BOT_NAME = this.configService.get<string>('TELEGRAM_BOT_NAME', '');
    const BOT_KEY = this.configService.get<string>('TELEGRAM_BOT_KEY', '');

    const bot = new Bot(BOT_KEY);
    bot.on('message', async (ctx) => {
      const keyword = ctx.message.text ?? '';
      const filteredKeyword = keyword.replace(BOT_NAME, '').trim();
      const newProducts =
        await this.giftsService.searchKeywordForNewProducts(filteredKeyword);
      if (newProducts.length === 0) {
        return ctx.reply(
          `Não foi possível encontrar novos itens com a palavra-chave "${filteredKeyword}" para adicionar à sua lista.`,
        );
      }
      return ctx.reply(
        `Novos itens adicionados com sucesso à sua lista:\n${JSON.stringify(newProducts, null, 2)}`,
      );
    });
    this.bot = bot;

    const NODE_ENV = this.configService.get<string>('NODE_ENV', 'production');

    if (NODE_ENV === 'local') {
      this.startBot();
    }
  }

  public async startBot(): Promise<void> {
    await this.bot.start();
  }

  public sendMessage({
    chatId,
    text,
    other,
  }: {
    chatId: string;
    text: string;
    other?: Other<RawApi, 'sendMessage', 'text' | 'chat_id'> | undefined;
  }) {
    return this.bot.api.sendMessage(chatId, text, other);
  }
}
