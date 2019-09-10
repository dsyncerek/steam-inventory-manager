import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { parse } from 'cookie';
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

  private static getTokenFromCookie(req: Request): string {
    try {
      const cookies = parse(req.headers.cookie);
      return cookies.Authorization;
    } catch {
      return null;
    }
  }

  async validate({ steamId }: JwtPayload): Promise<User> {
    return this.authService.validateUser(steamId);
  }
}
