import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotService } from './bot.service';
import { Bot } from './entity/bot.entity';

describe('BotService', () => {
  let botService: BotService;
  let botRepository: Repository<Bot>;

  const BOTS: Bot[] = [new Bot({ steamId: '123' }), new Bot({ steamId: '456' }), new Bot({ steamId: '789' })];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotService, { provide: getRepositoryToken(Bot), useClass: Repository }],
    }).compile();

    botService = module.get<BotService>(BotService);
    botRepository = module.get<Repository<Bot>>(getRepositoryToken(Bot));
  });

  it('should be defined', () => {
    expect(botService).toBeDefined();
  });

  describe('getAllBots', () => {
    it('should get all bots', async () => {
      jest.spyOn(botRepository, 'find').mockResolvedValue(BOTS);

      const bots = await botService.getAllBots();

      expect(bots).toBe(BOTS);
      expect(botRepository.find).toBeCalledTimes(1);
      expect(botRepository.find).toBeCalledWith();
    });
  });

  describe('getUserBots', () => {
    it('should get user bots', async () => {
      jest.spyOn(botRepository, 'find').mockResolvedValue(BOTS);

      const ownerSteamId = '000';
      const bots = await botService.getUserBots(ownerSteamId);

      expect(bots).toBe(BOTS);
      expect(botRepository.find).toBeCalledTimes(1);
      expect(botRepository.find).toBeCalledWith({ owner: { steamId: ownerSteamId } });
    });
  });

  describe('getBot', () => {
    it('should get bot', async () => {
      jest.spyOn(botRepository, 'findOneOrFail').mockResolvedValue(BOTS[0]);

      const steamId = BOTS[0].steamId;
      const bot = await botService.getBot(steamId);

      expect(bot).toBe(BOTS[0]);
      expect(botRepository.findOneOrFail).toBeCalledTimes(1);
      expect(botRepository.findOneOrFail).toBeCalledWith({ steamId });
    });
  });

  describe('createBot', () => {
    it('should create bot', async () => {
      jest.spyOn(botRepository, 'insert').mockResolvedValue(null);
      jest.spyOn(botRepository, 'findOneOrFail').mockResolvedValue(BOTS[0]);

      const bot = await botService.createBot(BOTS[0]);

      expect(bot).toBe(BOTS[0]);
      expect(botRepository.insert).toBeCalledTimes(1);
      expect(botRepository.insert).toBeCalledWith(BOTS[0]);
      expect(botRepository.findOneOrFail).toBeCalledTimes(1);
    });
  });

  describe('updateBot', () => {
    it('should update bot', async () => {
      jest.spyOn(botRepository, 'update').mockResolvedValue(null);
      jest.spyOn(botRepository, 'findOneOrFail').mockResolvedValue(BOTS[0]);

      const steamId = BOTS[0].steamId;
      const bot = await botService.updateBot(steamId, BOTS[0]);

      expect(bot).toBe(BOTS[0]);
      expect(botRepository.update).toBeCalledTimes(1);
      expect(botRepository.update).toBeCalledWith({ steamId }, BOTS[0]);
      expect(botRepository.findOneOrFail).toBeCalledTimes(1);
    });
  });

  describe('deleteBot', () => {
    it('should delete bot', async () => {
      jest.spyOn(botRepository, 'delete').mockResolvedValue(null);

      const steamId = BOTS[0].steamId;
      await botService.deleteBot(steamId);

      expect(botRepository.delete).toBeCalledTimes(1);
      expect(botRepository.delete).toBeCalledWith({ steamId });
    });
  });
});
