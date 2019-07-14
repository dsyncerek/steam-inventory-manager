import { Request } from 'express';

export function getTokenFromCookie(req: Request): string {
  if (req && req.cookies) {
    return req.cookies.Authorization;
  }
}

export function generateTokenCookie(token: string): string {
  return `Authorization=${token}; HttpOnly; Max-Age=${3600}`;
}

export function clearTokenCookie(): string {
  return 'Authorization=;Max-age=0';
}
