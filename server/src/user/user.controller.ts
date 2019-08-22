import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InjectUser } from '../common/decorators/inject-user.decorator';
import { PermissionsAllowed } from '../common/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../common/enums/permissions.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.GetAllUsers)
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.GetUser)
  getUserBySteamId(@Param('steamId') steamId: string, @InjectUser() user: User): Promise<User> {
    return this.userService.getBySteamId(steamId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.CreateUser)
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':steamId')
  @PermissionsAllowed(PermissionsEnum.UpdateUser)
  updateUserBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateUserDto, @InjectUser() user: User): Promise<User> {
    return this.userService.updateBySteamId(steamId, body);
  }

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.DeleteUser)
  deleteUserBySteamId(@Param('steamId') steamId: string, @InjectUser() user: User): Promise<void> {
    return this.userService.deleteBySteamId(steamId);
  }
}
