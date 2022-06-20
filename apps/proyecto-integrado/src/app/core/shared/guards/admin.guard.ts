import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, skipWhile, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { selectIsAdmin } from '../../../state/selectors/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    return this.store$.select(selectIsAdmin).pipe(
      skipWhile((isAdmin) => isAdmin === undefined),
      map((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/home']);
        }
        return isAdmin;
      })
    );
  }
}
