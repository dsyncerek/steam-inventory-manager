import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { InjectUser } from './decorators/inject-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('openid'))
  login(@InjectUser() user: User, @Res() res: Response): void {
    const token = this.authService.generateToken(user);
    res.redirect(`http://localhost:4200/callback/?token=${token}`); // todo
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@InjectUser() user: User): User {
    return user;
  }
}
