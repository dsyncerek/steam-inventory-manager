import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { serialize } from 'cookie';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/JwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(steamId: string): Promise<User> {
    return this.userService.upsert({ steamId });
  }

  login({ steamId }: User): string {
    const payload: JwtPayload = { steamId };
    const token = this.jwtService.sign(payload);
    return serialize('Authorization', token, { httpOnly: true, maxAge: 3600 * 24 * 7, path: '/' });
  }

  logout(): string {
    return serialize('Authorization', '', { httpOnly: true, maxAge: 0, path: '/' });
  }
}
