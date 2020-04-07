import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CallbackComponent } from '@core/auth/components/callback.component';
import { LoginComponent } from '@core/auth/components/login.component';
import { LogoutComponent } from '@core/auth/components/logout.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
