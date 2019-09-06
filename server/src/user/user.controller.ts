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

  @Get('get-all')
  @PermissionsAllowed(PermissionsEnum.UserGetAll)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('get/:steamId')
  @PermissionsAllowed(PermissionsEnum.UserGetAny)
  async getUser(@Param('steamId') steamId: string): Promise<User> {
    return this.userService.getUser(steamId);
  }

  @Post('create')
  @PermissionsAllowed(PermissionsEnum.UserCreateAny)
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put('update/:steamId')
  @PermissionsAllowed(PermissionsEnum.UserUpdateAny)
  async updateUser(@Param('steamId') steamId: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(steamId, body);
  }

  @Delete('delete/:steamId')
  @PermissionsAllowed(PermissionsEnum.UserDeleteAny)
  async deleteUser(@Param('steamId') steamId: string): Promise<void> {
    return this.userService.deleteUser(steamId);
  }
}
