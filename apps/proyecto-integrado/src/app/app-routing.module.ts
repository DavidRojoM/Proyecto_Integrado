import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/shared/guards/admin.guard';
import { UnauthenticatedGuard } from './core/shared/guards/unauthenticated.guard';
import { AuthenticatedGuard } from './core/shared/guards/authenticated.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./core/pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'parties',
    loadChildren: () =>
      import('./core/pages/parties/parties.module').then(
        (m) => m.PartiesModule
      ),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./core/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'wishlists',
    loadChildren: () =>
      import('./core/pages/wishlists/wishlists.module').then(
        (m) => m.WishlistsModule
      ),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./core/pages/backoffice/backoffice.module').then(
        (m) => m.BackofficeModule
      ),
    canActivate: [AuthenticatedGuard, AdminGuard],
  },
  {
    path: 'notfound',
    loadChildren: () =>
      import('./core/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./core/pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UnauthenticatedGuard],
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
