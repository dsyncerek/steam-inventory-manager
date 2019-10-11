import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BotService } from './bot.service';
import { Bot } from './entity/bot.entity';

describe('BotService', () => {
  let service: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        { provide: getRepositoryToken(Bot), useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
