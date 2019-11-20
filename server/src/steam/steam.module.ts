import { HttpModule, Module } from '@nestjs/common';
import { SteamApiService } from './steam-api.service';
import { SteamService } from './steam.service';

@Module({
  imports: [HttpModule],
  providers: [SteamService, SteamApiService],
  exports: [SteamService],
})
export class SteamModule {}
