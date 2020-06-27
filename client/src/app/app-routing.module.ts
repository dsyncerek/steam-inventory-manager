import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Route[] = [
  {
    path: 'bots',
    canActivate: [AuthGuard],
    loadChildren: async () => await import('./features/bot/bot.module').then(m => m.BotModule),
  },
  {
    path: '**',
    redirectTo: 'bots',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
