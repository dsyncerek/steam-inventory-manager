import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { Bot } from './entity/bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bot])],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}
