import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from '@app/features/home-page/home-page.component';
import { NotFoundPageComponent } from '@app/features/not-found-page/not-found-page.component';
import { AuthGuard } from '@core/auth/auth.guard';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'bots',
    canActivate: [AuthGuard],
    loadChildren: async () => await import('./features/bot/bot.module').then(m => m.BotModule),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
