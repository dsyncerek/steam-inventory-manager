import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from './auth.interceptor';
import { CallbackComponent } from './containers/callback.component';
import { LoginComponent } from './containers/login.component';
import { LogoutComponent } from './containers/logout.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  declarations: [LoginComponent, CallbackComponent, LogoutComponent],
})
export class AuthModule {}
