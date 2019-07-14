import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':steamId')
  getByName(@Param('steamId') steamId: string): Promise<User> {
    return this.userService.getBySteamId(steamId);
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  };

  @Put(':steamId')
  updateBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateBySteamId(steamId, body);
  };

  @Delete(':steamId')
  deleteBySteamId(@Param('steamId') steamId: string): Promise<void> {
    return this.userService.deleteBySteamId(steamId);
  };
}
