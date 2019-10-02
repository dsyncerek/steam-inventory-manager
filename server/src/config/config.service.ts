import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = parse(readFileSync('.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
