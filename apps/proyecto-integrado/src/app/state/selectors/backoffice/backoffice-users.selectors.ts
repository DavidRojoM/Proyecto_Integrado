import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { UsersState } from '../../interfaces/users.state.interface';

const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (usersState: UsersState) => usersState.users
);
