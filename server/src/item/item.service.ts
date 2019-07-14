import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemService {
  @InjectRepository(Item)
  private readonly itemRepository: Repository<Item>;

  getAll = async (): Promise<Item[]> => {
    return await this.itemRepository.find();
  };

  getByName = async (name: string): Promise<Item> => {
    return await this.itemRepository.findOneOrFail({ name });
  };

  create = async (data: CreateItemDto): Promise<Item> => {
    const item = new Item(data);
    await this.itemRepository.insert(item);
    return await this.getByName(item.name);
  };

  updateByName = async (name: string, data: UpdateItemDto): Promise<Item> => {
    await this.itemRepository.update({ name }, data);
    return await this.getByName(name);
  };

  deleteByName = async (name: string): Promise<void> => {
    await this.itemRepository.delete({ name });
  };
}
