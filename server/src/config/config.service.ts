import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = parse(readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
