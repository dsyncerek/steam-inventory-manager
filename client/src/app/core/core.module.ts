import { NgModule } from '@angular/core';
import { AuthEffects } from '@core/auth/auth.effects';
import { AuthModule } from '@core/auth/auth.module';
import { reducers } from '@core/core.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument(),
    AuthModule,
  ],
})
export class CoreModule {}
