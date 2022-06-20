import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, skipWhile } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly store$: Store<AppState>,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store$
      .select((state) => ({
        loading: state.auth.loading,
        isAuthenticated: state.auth.isAuthenticated,
      }))
      .pipe(
        skipWhile((state) => state.loading),
        map(({ isAuthenticated }) => {
          if (!isAuthenticated) {
            this.router.navigate(['/']);
          }
          return isAuthenticated;
        })
      );
  }
}
