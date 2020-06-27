import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthRoutingModule } from '@core/auth/auth-routing.module';
import { AuthInterceptor } from '@core/auth/auth.interceptor';
import { AuthService } from '@core/auth/auth.service';
import { CallbackComponent } from '@core/auth/components/callback.component';
import { LoginComponent } from '@core/auth/components/login.component';
import { LogoutComponent } from '@core/auth/components/logout.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, CallbackComponent, LogoutComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => async () => await authService.init(),
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
