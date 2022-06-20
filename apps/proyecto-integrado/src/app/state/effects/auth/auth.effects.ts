import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AuthActionTypes } from '../../actions/auth/auth-action.types.enum';
import { AuthService } from '../../../core/shared/modules/auth/services/auth.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { selectUser } from '../../selectors/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { PartiesActionTypes } from '../../actions/parties/parties-action.types.enum';
import { UsersService } from '../../../core/shared/modules/users/services/users.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly store$: Store<AppState>,
    private readonly usersService: UsersService
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
          this.snackbarService.open('User already exists', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  addBalances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.ADD_BALANCES_REQUEST),
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ amount }, user]) =>
        this.authService
          .addBalances({
            amount: Number(amount) + Number(user.balance),
            userId: user.id,
          })
          .pipe(
            map((balances) => ({
              type: AuthActionTypes.ADD_BALANCES_SUCCESS,
              balances,
            })),
            catchError((error) => {
              return of({
                type: AuthActionTypes.ADD_BALANCES_FAILURE,
                error,
              });
            })
          )
      )
    )
  );

  addBalancesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.ADD_BALANCES_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not add balances', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  checkoutPartySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CHECKOUT_PARTY_SUCCESS),
      map(({ balances }) => ({
        type: AuthActionTypes.ADD_BALANCES_SUCCESS,
        balances: {
          amount: balances,
        },
      }))
    )
  );

  cancelCheckoutPartySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CANCEL_CHECKOUT_PARTY_SUCCESS),
      map(({ balances }) => ({
        type: AuthActionTypes.ADD_BALANCES_SUCCESS,
        balances: {
          amount: balances,
        },
      }))
    )
  );

  confirmPartySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CONFIRM_PARTY_SUCCESS),
      map(({ balances }) => ({
        type: AuthActionTypes.ADD_BALANCES_SUCCESS,
        balances: {
          amount: balances,
        },
      }))
    )
  );

  updateUserRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.UPDATE_USER_REQUEST),
      switchMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          map((user) => ({
            type: AuthActionTypes.UPDATE_USER_SUCCESS,
            user,
          })),
          catchError((error) => {
            return of({
              type: AuthActionTypes.UPDATE_USER_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.UPDATE_USER_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not update your profile',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
