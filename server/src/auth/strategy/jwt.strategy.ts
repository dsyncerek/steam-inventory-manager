import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/entity/user.entity';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt-secret', // todo
    });
  }

  async validate({ steamId }: JwtPayload): Promise<User> {
    return this.authService.validateUser(steamId);
  }
}
