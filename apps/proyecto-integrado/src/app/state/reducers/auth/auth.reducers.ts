import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions/auth/auth.actions';
import { AuthState } from '../../interfaces/auth.state.interface';
import { PartiesActions } from '../../actions/parties/parties.actions';
import { PartyOutput } from '../../../core/shared/modules/parties/domain/parties.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

export const authReducers = createReducer(
  initialState,
  on(AuthActions.loginRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    isAuthenticated: true,
    error: undefined,
    loading: false,
    user: loginResponse.user,
  })),
  on(AuthActions.loginFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error: error.error.statusText,
    user: undefined,
  })),
  on(AuthActions.signupRequest, (state) => ({
    ...state,
    loading: true,
    userAdded: false,
  })),
  on(AuthActions.signupSuccess, (state) => ({
    ...state,
    error: undefined,
    loading: false,
    userAdded: true,
  })),
  on(AuthActions.signupFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
    userAdded: false,
  })),
  on(AuthActions.checkAuthRequest, (state) => ({
    ...state,
    loading: true,
    isAuthenticated: false,
  })),
  on(AuthActions.checkAuthSuccess, (state, { loginResponse }) => ({
    ...state,
    isAuthenticated: true,
    error: undefined,
    loading: false,
    user: loginResponse.user,
  })),
  on(AuthActions.checkAuthFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error: error.error.statusText,
    user: undefined,
  })),
  on(AuthActions.logoutRequest, (state) => ({
    ...state,
    loading: false,
    error: undefined,
    isAuthenticated: false,
    user: undefined,
  })),
  on(PartiesActions.joinPartySuccess, (state, { user, party }) => ({
    ...state,
    user: {
      ...(state.user as User),
      parties: [...(state.user?.parties || []), party],
    },
  })),
  on(PartiesActions.leavePartySuccess, (state, { userId, partyId }) => ({
    ...state,
    user: {
      ...(state.user as User),
      parties: state.user?.parties.filter((p) => p.id !== partyId) || [],
    },
  }))
);
