import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './components/callback.component';
import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  declarations: [LoginComponent, CallbackComponent, LogoutComponent],
})
export class AuthModule {}
