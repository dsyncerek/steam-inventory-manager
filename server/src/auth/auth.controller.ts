import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { InjectUser } from './decorators/inject-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('login')
  @UseGuards(AuthGuard('openid'))
  login(@InjectUser() user: User, @Res() res: Response) {
    const cookie = this.authService.login(user);
    res.setHeader('Set-Cookie', [cookie]);
    res.redirect('/auth/me');
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Res() res: Response) {
    const cookie = this.authService.logout();
    res.setHeader('Set-Cookie', [cookie]);
    res.redirect('/auth/me');
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@InjectUser() user: User): User {
    return user;
  }
}
