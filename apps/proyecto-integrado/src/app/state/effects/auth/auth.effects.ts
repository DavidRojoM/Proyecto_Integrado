import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthActionTypes } from '../../actions/auth/auth-action.types.enum';
import { AuthService } from '../../../core/shared/modules/auth/services/auth.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/shared/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_REQUEST),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((loginResponse) => ({
            type: AuthActionTypes.LOGIN_SUCCESS,
            loginResponse,
          })),
          catchError((error) => {
            return of({
              type: AuthActionTypes.LOGIN_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap(({ loginResponse }: any) => {
          console.log('loginSuccess$', loginResponse);
          this.localStorageService.setItem(
            'access_token',
            loginResponse.access_token
          );
          this.localStorageService.setItem('userId', loginResponse.user.id);
          this.localStorageService.setItem('role', loginResponse.user.role);
          this.localStorageService.setItem(
            'username',
            loginResponse.user.username
          );
          this.snackbarService.open('Successfully Logged in 🥳', 'OK', 2000);
          this.router.navigate(['/home']);
        })
      ),
    {
      dispatch: false,
    }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap(() => {
          this.snackbarService.open('Invalid credentials 😢', 'DISMISS', 2000);
          this.router.navigate(['/']);
        })
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT_REQUEST),
        tap(() => {
          this.localStorageService.clear();
          this.router.navigate(['/']);
        })
      ),
    {
      dispatch: false,
    }
  );

  check$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.CHECK_AUTH_REQUEST),
      switchMap(() =>
        this.authService.check().pipe(
          map((loginResponse) => ({
            type: AuthActionTypes.CHECK_AUTH_SUCCESS,
            loginResponse,
          })),
          catchError((error) => {
            return of({
              type: AuthActionTypes.CHECK_AUTH_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  checkSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.CHECK_AUTH_SUCCESS),
        tap(({ loginResponse }: any) => {
          console.log('checkSuccess', loginResponse);
          this.localStorageService.setItem(
            'access_token',
            loginResponse.access_token
          );
          this.localStorageService.setItem('userId', loginResponse.user.id);
          this.localStorageService.setItem('role', loginResponse.user.role);
          this.localStorageService.setItem(
            'username',
            loginResponse.user.username
          );
          this.router.navigate(['/home']);
        })
      ),
    {
      dispatch: false,
    }
  );

  checkFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.CHECK_AUTH_FAILURE),
        tap(() => {
          if (this.localStorageService.getItem('access_token')) {
            this.localStorageService.clear();
            this.snackbarService.open('Session timed out', 'DISMISS', 2000);
            this.router.navigate(['/']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SIGNUP_REQUEST),
      switchMap(({ user }) =>
        this.authService.signup(user).pipe(
          map(() => ({
            type: AuthActionTypes.SIGNUP_SUCCESS,
          })),
          catchError((error) => {
            return of({
              type: AuthActionTypes.SIGNUP_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  singupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap(() => {
          this.snackbarService.open('Successfully signed-up 🥳', 'OK', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE),
        tap(() => {
          this.snackbarService.open('Invalid credentials 😢', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );
}
