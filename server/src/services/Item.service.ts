import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TYPES } from '../constants/types';
import ItemCreateDto from '../dtos/ItemCreate.dto';
import ItemUpdateDto from '../dtos/ItemUpdate.dto';
import Item from '../entities/Item.entity';
import EntityCreateException from '../exceptions/EntityCreateException';
import EntityDeleteException from '../exceptions/EntityDeleteException';
import EntityGetException from '../exceptions/EntityGetException';
import EntityUpdateException from '../exceptions/EntityUpdateException';

interface ItemServiceInterface {
  getAllItems(): Promise<Item[]>;
  getItemByName(name: string): Promise<Item>;
  createItem(data: ItemCreateDto): Promise<void>;
  updateItemByName(name: string, data: ItemUpdateDto): Promise<void>;
  deleteItemByName(name: string): Promise<void>;
}

@injectable()
class ItemService implements ItemServiceInterface {
  @inject(TYPES.ItemRepository)
  private itemRepository: Repository<Item>;

  public getAllItems = async (): Promise<Item[]> => {
    return await this.itemRepository.find();
  };

  public getItemByName = async (name: string): Promise<Item> => {
    try {
      return await this.itemRepository.findOneOrFail({ name });
    } catch (e) {
      throw new EntityGetException(e.message);
    }
  };

  public createItem = async (data: ItemCreateDto): Promise<void> => {
    try {
      const item = new Item({ ...data });
      await this.itemRepository.save(item);
    } catch (e) {
      throw new EntityCreateException(e.message);
    }
  };

  public updateItemByName = async (name: string, data: ItemUpdateDto): Promise<void> => {
    try {
      await this.itemRepository.update({ name }, { ...data });
    } catch (e) {
      throw new EntityUpdateException(e.message);
    }
  };

  public deleteItemByName = async (name: string): Promise<void> => {
    try {
      await this.itemRepository.delete({ name });
    } catch (e) {
      throw new EntityDeleteException(e.message);
    }
  };
}

export { ItemServiceInterface };
export default ItemService;
