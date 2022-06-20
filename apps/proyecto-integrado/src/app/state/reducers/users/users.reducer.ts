import { UsersState } from '../../interfaces/users.state.interface';
import { createReducer, on } from '@ngrx/store';
import { BackofficeActions } from '../../actions/backoffice/backoffice.actions';

const initialState: UsersState = {
  users: [],
  loading: false,
};

export const usersReducer = createReducer(
  initialState,
  on(BackofficeActions.findUsersRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.findUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(BackofficeActions.findUsersFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.addUserRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.addUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, user],
  })),
  on(BackofficeActions.addUserFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.deleteUserRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    loading: false,
    users: state.users.filter((user) => user.id !== userId),
  })),
  on(BackofficeActions.deleteUserFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.editUserRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.editUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),
  on(BackofficeActions.editUserFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
