import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from './app.route';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoute.HOME
  },
  {
    path: AppRoute.HOME,
    loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: AppRoute.LOGIN,
    loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
