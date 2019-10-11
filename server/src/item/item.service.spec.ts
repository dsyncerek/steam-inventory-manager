import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: Repository<Item>;

  const ITEMS: Item[] = [
    { classId: '123', appId: 730, contextId: 2, name: 'AK-47', icon: 'ak-47.png' },
    { classId: '456', appId: 730, contextId: 2, name: 'AWP', icon: 'awp.png' },
    { classId: '789', appId: 730, contextId: 2, name: 'M4A4', icon: 'm4a4.png' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, { provide: getRepositoryToken(Item), useClass: Repository }],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(itemService).toBeDefined();
  });

  describe('getAllItems', () => {
    it('should get all items', async () => {
      jest.spyOn(itemRepository, 'find').mockResolvedValue(ITEMS);

      const items = await itemService.getAllItems();

      expect(items).toHaveLength(3);
      expect(itemRepository.find).toBeCalledTimes(1);
    });
  });

  describe('getItem', () => {
    it('should get item', async () => {
      jest.spyOn(itemRepository, 'findOneOrFail').mockResolvedValue(ITEMS[0]);

      const classId = ITEMS[0].classId;
      const item = await itemService.getItem(classId);

      expect(item).toBe(ITEMS[0]);
      expect(itemRepository.findOneOrFail).toBeCalledTimes(1);
      expect(itemRepository.findOneOrFail).toBeCalledWith({ classId });
    });
  });

  describe('createItem', () => {
    it('should create item', async () => {
      jest.spyOn(itemRepository, 'findOneOrFail').mockResolvedValue(ITEMS[0]);
      jest.spyOn(itemRepository, 'insert').mockResolvedValue(null);

      await itemService.createItem(ITEMS[0]);

      expect(itemRepository.insert).toBeCalledTimes(1);
      expect(itemRepository.insert).toBeCalledWith(ITEMS[0]);
    });
  });

  describe('updateItem', () => {
    it('should update item', async () => {
      jest.spyOn(itemRepository, 'findOneOrFail').mockResolvedValue(ITEMS[0]);
      jest.spyOn(itemRepository, 'update').mockResolvedValue(null);

      const classId = ITEMS[0].classId;
      await itemService.updateItem(classId, ITEMS[0]);

      expect(itemRepository.update).toBeCalledTimes(1);
      expect(itemRepository.update).toBeCalledWith({ classId }, ITEMS[0]);
    });
  });

  describe('deleteItem', () => {
    it('should delete item', async () => {
      jest.spyOn(itemRepository, 'delete').mockResolvedValue(null);

      const classId = ITEMS[0].classId;
      await itemService.deleteItem(classId);

      expect(itemRepository.delete).toBeCalledTimes(1);
      expect(itemRepository.delete).toBeCalledWith({ classId });
    });
  });
});
