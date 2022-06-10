import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/app.state.interface';
import { authReducers } from './reducers/auth/auth.reducers';
import { partiesReducer } from './reducers/parties/parties.reducer';

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducers,
  parties: partiesReducer,
};
