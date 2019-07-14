import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '../../user/entity/user.entity';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { getTokenFromCookie } from '../utils/cookies';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: getTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  async validate({ steamId }: JwtPayload): Promise<User> {
    return this.authService.validateUser(steamId);
  }
}
