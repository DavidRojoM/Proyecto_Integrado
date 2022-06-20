import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action.types.enum';
import { LoginResponse } from '../../../core/shared/modules/auth/domain/login-response.interface';
import { Credentials } from '../../../core/shared/modules/auth/domain/credentials.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';
import { ChangeBalances } from '../../../core/shared/modules/auth/domain/change-balances.interface';

export const AuthActions = {
  loginRequest: createAction(
    AuthActionTypes.LOGIN_REQUEST,
    props<{ credentials: Credentials }>()
  ),
  loginSuccess: createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<{ loginResponse: LoginResponse }>()
  ),
  loginFailure: createAction(
    AuthActionTypes.LOGIN_FAILURE,
    props<{ error: string }>()
  ),

  signupRequest: createAction(
    AuthActionTypes.SIGNUP_REQUEST,
    props<{ user: User }>()
  ),

  signupSuccess: createAction(AuthActionTypes.SIGNUP_SUCCESS),

  signupFailure: createAction(
    AuthActionTypes.SIGNUP_FAILURE,
    props<{ error: string }>()
  ),

  checkAuthRequest: createAction(AuthActionTypes.CHECK_AUTH_REQUEST),

  checkAuthSuccess: createAction(
    AuthActionTypes.CHECK_AUTH_SUCCESS,
    props<{ loginResponse: LoginResponse }>()
  ),
  checkAuthFailure: createAction(
    AuthActionTypes.CHECK_AUTH_FAILURE,
    props<{ error: string }>()
  ),

  logoutRequest: createAction(AuthActionTypes.LOGOUT_REQUEST),
  addBalancesRequest: createAction(
    AuthActionTypes.ADD_BALANCES_REQUEST,
    props<{ amount: number }>()
  ),
  addBalancesSuccess: createAction(
    AuthActionTypes.ADD_BALANCES_SUCCESS,
    props<{ balances: ChangeBalances }>()
  ),
  addBalancesFailure: createAction(
    AuthActionTypes.ADD_BALANCES_FAILURE,
    props<{ error: string }>()
  ),

  updateUserRequest: createAction(
    AuthActionTypes.UPDATE_USER_REQUEST,
    props<{ user: User }>()
  ),
  updateUserSuccess: createAction(
    AuthActionTypes.UPDATE_USER_SUCCESS,
    props<{ user: User }>()
  ),
  updateUserFailure: createAction(
    AuthActionTypes.UPDATE_USER_FAILURE,
    props<{ error: any }>()
  ),
};
