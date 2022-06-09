import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/app.state.interface';
import { authReducers } from './reducers/auth/auth.reducers';

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducers,
};
