import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/pages/auth/auth.module').then((m) => m.AuthModule),
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./core/pages/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./core/pages/backoffice/backoffice.module').then(
        (m) => m.BackofficeModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'notfound',
    loadChildren: () =>
      import('./core/shared/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'notfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
