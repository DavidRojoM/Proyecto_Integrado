export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] Login Request',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  SIGNUP_REQUEST = '[Auth] Signup Request',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',

  CHECK_AUTH_REQUEST = '[Auth] Check Auth Request',
  CHECK_AUTH_SUCCESS = '[Auth] Check Auth Success',
  CHECK_AUTH_FAILURE = '[Auth] Check Auth Failure',

  ADD_BALANCES_REQUEST = '[Auth] Add Balances Request',
  ADD_BALANCES_SUCCESS = '[Auth] Add Balances Success',
  ADD_BALANCES_FAILURE = '[Auth] Add Balances Failure',

  UPDATE_USER_REQUEST = '[Auth] Update User Request',
  UPDATE_USER_SUCCESS = '[Auth] Update User Success',
  UPDATE_USER_FAILURE = '[Auth] Update User Failure',

  LOGOUT_REQUEST = '[Auth] Logout Request',
}
