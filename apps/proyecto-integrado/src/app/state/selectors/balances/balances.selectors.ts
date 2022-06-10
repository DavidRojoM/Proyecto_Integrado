import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { AuthState } from '../../interfaces/auth.state.interface';

const selectAuthFeature = (state: AppState) => state.auth;

export const selectBalances = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.user?.balance || 0
);
