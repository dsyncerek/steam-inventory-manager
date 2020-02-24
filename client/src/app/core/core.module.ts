import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '../shared/shared.module';
import { AuthEffects } from './auth/auth.effects';
import { AuthModule } from './auth/auth.module';
import { reducers } from './core.state';

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
