import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from '@core/auth/auth-routing.module';
import { AuthInterceptor } from '@core/auth/auth.interceptor';
import { CallbackComponent } from '@core/auth/components/callback.component';
import { LoginComponent } from '@core/auth/components/login.component';
import { LogoutComponent } from '@core/auth/components/logout.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  declarations: [LoginComponent, CallbackComponent, LogoutComponent],
})
export class AuthModule {}
