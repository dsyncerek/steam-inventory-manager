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

  getAllUsers = async (): Promise<User[]> => {
    return this.userRepository.find();
  };

  getUser = async (steamId: string): Promise<User> => {
    return this.userRepository.findOneOrFail({ steamId });
  };

  createUser = async (data: CreateUserDto): Promise<User> => {
    const user = new User({ ...data, roles: [RolesEnum.User] });
    await this.userRepository.save(user);
    return this.getUser(user.steamId);
  };

  updateUser = async (steamId: string, data: UpdateUserDto): Promise<User> => {
    await this.userRepository.update({ steamId }, data);
    return this.getUser(steamId);
  };

  deleteUser = async (steamId: string): Promise<void> => {
    await this.userRepository.delete({ steamId });
  };

  upsertUser = async (data: CreateUserDto): Promise<User> => {
    try {
      return this.getUser(data.steamId);
    } catch (e) {
      return this.createUser(data);
    }
  };
}
