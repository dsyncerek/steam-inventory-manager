import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { User } from '../../user/entity/user.entity';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: JwtStrategy.getTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  async validate({ steamId }: JwtPayload): Promise<User> {
    return this.authService.validateUser(steamId);
  }

  private static getTokenFromCookie(req: Request): string {
    if (req && req.cookies) {
      return req.cookies.Authorization;
    }
  }
}
