import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action.types.enum';
import { LoginResponse } from '../../../core/shared/modules/auth/domain/login-response.interface';

export const AuthActions = {
  loginRequest: createAction(
    AuthActionTypes.LOGIN_REQUEST,
    props<{ username: string; password: string }>()
  ),
  loginSuccess: createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<LoginResponse>()
  ),
  loginFailure: createAction(
    AuthActionTypes.LOGIN_FAILURE,
    props<{ error: string }>()
  ),

  logoutRequest: createAction(AuthActionTypes.LOGOUT_REQUEST),

  logoutSuccess: createAction(AuthActionTypes.LOGOUT_SUCCESS),
};
