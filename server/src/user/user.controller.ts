import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.UserGetAll)
  @ApiOkResponse({ type: User, isArray: true })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.UserGetAny)
  @ApiOkResponse({ type: User })
  async getUser(@Param('steamId') steamId: string): Promise<User> {
    return this.userService.getUser(steamId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.UserCreateAny)
  @ApiCreatedResponse({ type: User })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Patch(':steamId')
  @PermissionsAllowed(PermissionsEnum.UserUpdateAny)
  @ApiOkResponse({ type: User })
  async updateUser(@Param('steamId') steamId: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(steamId, body);
  }

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.UserDeleteAny)
  @ApiNoContentResponse({})
  async deleteUser(@Param('steamId') steamId: string): Promise<void> {
    await this.userService.deleteUser(steamId);
  }
}
