import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieService } from '../common/service/cookie.service';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/JwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  async validateUser(steamId: string): Promise<User> {
    return await this.userService.upsert({ steamId });
  }

  login({ steamId }: User): string {
    const payload: JwtPayload = { steamId };
    const token = this.jwtService.sign(payload);
    return this.cookieService.create('Authorization', token);
  }

  logout(): string {
    return this.cookieService.create('Authorization', '', 0);
  }
}
