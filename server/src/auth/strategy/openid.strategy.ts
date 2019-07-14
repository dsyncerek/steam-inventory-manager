import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openid';
import { User } from '../../user/entity/user.entity';
import { AuthService } from '../auth.service';
import { getSteamIdFromIdentifier } from '../utils/getSteamIdFromIdentifier';

@Injectable()
export class OpenidStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      providerURL: 'https://steamcommunity.com/openid',
      returnURL: 'http://localhost:5000/auth/login',
      realm: 'http://localhost:5000/',
      stateless: true,
    });
  }

  async validate(identifier: string): Promise<User> {
    const steamId = getSteamIdFromIdentifier(identifier);
    return this.authService.validateUser(steamId);
  }
}
