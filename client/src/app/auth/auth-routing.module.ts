import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CallbackComponent } from './components/callback.component';
import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
