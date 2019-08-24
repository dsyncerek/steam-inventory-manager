import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEnum } from '../access-control/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  getAll = async (): Promise<User[]> => {
    return await this.userRepository.find();
  };

  getBySteamId = async (steamId: string): Promise<User> => {
    return await this.userRepository.findOneOrFail({ steamId });
  };

  create = async (data: CreateUserDto): Promise<User> => {
    const user = new User({ ...data, roles: [RolesEnum.User] });
    await this.userRepository.save(user);
    return await this.getBySteamId(user.steamId);
  };

  updateBySteamId = async (steamId: string, data: UpdateUserDto): Promise<User> => {
    await this.userRepository.update({ steamId }, data);
    return await this.getBySteamId(steamId);
  };

  deleteBySteamId = async (steamId: string): Promise<void> => {
    await this.userRepository.delete({ steamId });
  };

  upsert = async (data: CreateUserDto): Promise<User> => {
    try {
      return await this.getBySteamId(data.steamId);
    } catch (e) {
      return await this.create(data);
    }
  };
}
