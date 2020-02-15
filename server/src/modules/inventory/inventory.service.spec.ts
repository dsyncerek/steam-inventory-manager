import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SteamService } from '../steam/steam.service';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let inventoryRepository: Repository<Inventory>;
  let steamService: SteamService;

  const INVENTORIES: Inventory[] = [
    new Inventory({ id: '123' }),
    new Inventory({ id: '456' }),
    new Inventory({ id: '789' }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        { provide: getRepositoryToken(Inventory), useClass: Repository },
        { provide: SteamService, useValue: { getInventoryBySteamId: jest.fn() } },
      ],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
    inventoryRepository = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
    steamService = module.get<SteamService>(SteamService);
  });

  it('should be defined', () => {
    expect(inventoryService).toBeDefined();
  });

  describe('getUserInventories', () => {
    it('should get user inventories', async () => {
      jest.spyOn(inventoryRepository, 'find').mockResolvedValue(INVENTORIES);

      const userSteamId = '000';
      const inventories = await inventoryService.getUserInventories(userSteamId);

      expect(inventories).toBe(INVENTORIES);
      expect(inventoryRepository.find).toBeCalledTimes(1);
      expect(inventoryRepository.find).toBeCalledWith({ bot: { owner: { steamId: userSteamId } } });
    });
  });

  describe('getBotInventories', () => {
    it('should get bot inventories', async () => {
      jest.spyOn(inventoryRepository, 'find').mockResolvedValue(INVENTORIES);

      const botSteamId = '000';
      const inventories = await inventoryService.getBotInventories(botSteamId);

      expect(inventories).toBe(INVENTORIES);
      expect(inventoryRepository.find).toBeCalledTimes(1);
      expect(inventoryRepository.find).toBeCalledWith({ bot: { steamId: botSteamId } });
    });
  });

  describe('getInventory', () => {
    it('should get inventory', async () => {
      jest.spyOn(inventoryRepository, 'findOneOrFail').mockResolvedValue(INVENTORIES[0]);

      const id = INVENTORIES[0].id;
      const bot = await inventoryService.getInventory(id);

      expect(bot).toBe(INVENTORIES[0]);
      expect(inventoryRepository.findOneOrFail).toBeCalledTimes(1);
      expect(inventoryRepository.findOneOrFail).toBeCalledWith({ id });
    });
  });

  describe('createInventory', () => {
    it('should create inventory', async () => {
      jest.spyOn(steamService, 'getInventoryBySteamId').mockResolvedValue(INVENTORIES[0]);
      jest.spyOn(inventoryRepository, 'insert').mockResolvedValue(null);
      jest.spyOn(inventoryRepository, 'findOneOrFail').mockResolvedValue(INVENTORIES[0]);

      const { botSteamId, appId, contextId } = INVENTORIES[0];
      const inventory = await inventoryService.createInventory(INVENTORIES[0]);

      expect(inventory).toBe(INVENTORIES[0]);
      expect(steamService.getInventoryBySteamId).toBeCalledTimes(1);
      expect(steamService.getInventoryBySteamId).toBeCalledWith(botSteamId, appId, contextId);
      expect(inventoryRepository.insert).toBeCalledTimes(1);
      expect(inventoryRepository.insert).toBeCalledWith(INVENTORIES[0]);
      expect(inventoryRepository.findOneOrFail).toBeCalledTimes(1);
    });
  });

  describe('refreshInventory', () => {
    it('should refresh inventory', async () => {
      jest.spyOn(steamService, 'getInventoryBySteamId').mockResolvedValue(INVENTORIES[1]);
      jest.spyOn(inventoryRepository, 'delete').mockResolvedValue(null);
      jest.spyOn(inventoryRepository, 'insert').mockResolvedValue(null);
      jest.spyOn(inventoryRepository, 'findOneOrFail').mockResolvedValue(INVENTORIES[1]);

      const { id, botSteamId, appId, contextId } = INVENTORIES[1];
      const inventory = await inventoryService.refreshInventory(id);

      expect(inventory).toBe(INVENTORIES[1]);
      expect(steamService.getInventoryBySteamId).toBeCalledTimes(1);
      expect(steamService.getInventoryBySteamId).toBeCalledWith(botSteamId, appId, contextId);
      expect(inventoryRepository.delete).toBeCalledTimes(1);
      expect(inventoryRepository.delete).toBeCalledWith({ id });
      expect(inventoryRepository.insert).toBeCalledTimes(1);
      expect(inventoryRepository.insert).toBeCalledWith(INVENTORIES[1]);
      expect(inventoryRepository.findOneOrFail).toBeCalledTimes(2);
    });
  });

  describe('deleteInventory', () => {
    it('should delete inventory', async () => {
      jest.spyOn(inventoryRepository, 'delete').mockResolvedValue(null);

      const id = INVENTORIES[0].id;
      await inventoryService.deleteInventory(id);

      expect(inventoryRepository.delete).toBeCalledTimes(1);
      expect(inventoryRepository.delete).toBeCalledWith({ id });
    });
  });
});
