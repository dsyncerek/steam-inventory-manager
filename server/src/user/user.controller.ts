import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put } from '@nestjs/common';
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
  @PermissionsAllowed(PermissionsEnum.GetUser, PermissionsEnum.GetMe)
  getUserBySteamId(@Param('steamId') steamId: string, @InjectUser() user: User): Promise<User> {
    const ownResource = true;
    const hasPermission: boolean = user.hasPermission(PermissionsEnum.GetUser)
      || (user.hasPermission(PermissionsEnum.GetMe) && ownResource);

    if (hasPermission) {
      return this.userService.getBySteamId(steamId);
    }

    throw new ForbiddenException();
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.CreateUser)
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':steamId')
  @PermissionsAllowed(PermissionsEnum.UpdateUser, PermissionsEnum.UpdateMe)
  updateUserBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateUserDto, @InjectUser() user: User): Promise<User> {
    const ownResource = true;
    const hasPermission: boolean = user.hasPermission(PermissionsEnum.UpdateUser)
      || (user.hasPermission(PermissionsEnum.UpdateMe) && ownResource);

    if (hasPermission) {
      return this.userService.updateBySteamId(steamId, body);
    }

    throw new ForbiddenException();
  }

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.DeleteUser, PermissionsEnum.DeleteMe)
  deleteUserBySteamId(@Param('steamId') steamId: string, @InjectUser() user: User): Promise<void> {
    const ownResource = true;
    const hasPermission: boolean = user.hasPermission(PermissionsEnum.DeleteUser)
      || (user.hasPermission(PermissionsEnum.DeleteMe) && ownResource);

    if (hasPermission) {
      return this.userService.deleteBySteamId(steamId);
    }

    throw new ForbiddenException();
  }
}
