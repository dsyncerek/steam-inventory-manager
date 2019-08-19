import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieService {
  create(name: string, value: string, maxAge = 3600): string {
    return `${name}=${value}; HttpOnly; Max-Age=${maxAge}; Path=/`;
  }
}
