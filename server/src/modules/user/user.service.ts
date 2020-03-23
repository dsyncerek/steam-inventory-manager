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

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(steamId: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ steamId });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    await this.userRepository.insert({ ...data, roles: [RolesEnum.User] });
    return await this.getUser(data.steamId);
  }

  async updateUser(steamId: string, data: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ steamId }, data);
    return await this.getUser(steamId);
  }

  async upsertUser(data: CreateUserDto): Promise<User> {
    try {
      return await this.createUser(data);
    } catch {
      return await this.getUser(data.steamId);
    }
  }

  async deleteUser(steamId: string): Promise<void> {
    await this.userRepository.delete({ steamId });
  }
}
