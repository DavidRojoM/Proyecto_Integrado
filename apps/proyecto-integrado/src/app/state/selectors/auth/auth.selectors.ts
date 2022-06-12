import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { AuthState } from '../../interfaces/auth.state.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';

const selectAuthFeature = (state: AppState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.isAuthenticated
);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.loading
);

export const selectError = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.error
);

export const selectUser = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.user as User
);

export const selectUserAdded = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.userAdded
);

export const selectIsAdmin = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.user?.role === 'ADMIN'
);
