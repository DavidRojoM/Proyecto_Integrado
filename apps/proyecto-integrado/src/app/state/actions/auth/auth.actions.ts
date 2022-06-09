import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action.types.enum';
import { LoginResponse } from '../../../core/shared/modules/auth/domain/login-response.interface';
import { Credentials } from '../../../core/shared/modules/auth/domain/credentials.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';

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
};
