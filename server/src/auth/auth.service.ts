import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/JwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(steamId: string): Promise<User> {
    return this.userService.upsertUser({ steamId });
  }

  generateToken({ steamId, roles }: User): string {
    const payload: JwtPayload = { steamId, roles };
    return this.jwtService.sign(payload);
  }
}
