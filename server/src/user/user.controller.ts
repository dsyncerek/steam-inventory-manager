import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InjectUser } from '../common/decorators/inject-user.decorator';
import { RolesAllowed } from '../common/decorators/roles-allowed.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RolesAllowed('get_all_users')
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('me')
  @RolesAllowed('get_me')
  getMeBySteamId(@InjectUser() user: User): Promise<User> {
    return this.userService.getBySteamId(user.steamId);
  }

  @Get(':steamId')
  @RolesAllowed('get_user')
  getBySteamId(@Param('steamId') steamId: string): Promise<User> {
    return this.userService.getBySteamId(steamId);
  }

  @Post()
  @RolesAllowed('create_user')
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  };

  @Put('me')
  @RolesAllowed('update_me')
  updateMeBySteamId(@InjectUser() user: User, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateBySteamId(user.steamId, body);
  }

  @Put(':steamId')
  @RolesAllowed('update_user')
  updateBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateBySteamId(steamId, body);
  };

  @Delete('me')
  @RolesAllowed('delete_me')
  deleteMeBySteamId(@InjectUser() user: User): Promise<void> {
    return this.userService.deleteBySteamId(user.steamId);
  }

  @Delete(':steamId')
  @RolesAllowed('delete_user')
  deleteBySteamId(@Param('steamId') steamId: string): Promise<void> {
    return this.userService.deleteBySteamId(steamId);
  };
}
