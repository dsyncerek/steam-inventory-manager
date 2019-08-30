import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.GetAllUsers)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.GetUser)
  async getUserBySteamId(@Param('steamId') steamId: string): Promise<User> {
    return this.userService.getBySteamId(steamId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.CreateUser)
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':steamId')
  @PermissionsAllowed(PermissionsEnum.UpdateUser)
  async updateUserBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateBySteamId(steamId, body);
  }

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.DeleteUser)
  async deleteUserBySteamId(@Param('steamId') steamId: string): Promise<void> {
    return this.userService.deleteBySteamId(steamId);
  }
}
