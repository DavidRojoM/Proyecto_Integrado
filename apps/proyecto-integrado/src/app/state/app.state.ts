import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/app.state.interface';
import { authReducers } from './reducers/auth/auth.reducers';
import { partiesReducer } from './reducers/parties/parties.reducer';
import { messagesReducer } from './reducers/comms/messages.reducers';

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducers,
  parties: partiesReducer,
  messages: messagesReducer,
};
