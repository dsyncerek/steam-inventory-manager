import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import { clearTokenCookie, generateTokenCookie } from './utils/cookies';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(steamId: string): Promise<User> {
    return await this.userService.upsert({ steamId });
  }

  login({ steamId }: User): string {
    const payload: JwtPayload = { steamId };
    const token = this.jwtService.sign(payload);
    return generateTokenCookie(token);
  }

  logout(): string {
    return clearTokenCookie();
  }
}
