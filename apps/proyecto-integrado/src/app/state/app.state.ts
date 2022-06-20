import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './interfaces/app.state.interface';
import { authReducers } from './reducers/auth/auth.reducers';
import { partiesReducer } from './reducers/parties/parties.reducer';
import { messagesReducer } from './reducers/comms/messages.reducers';
import { tripsReducer } from './reducers/trips/trips.reducers';
import { wishlistsReducer } from './reducers/wishlists/wishlists.reducers';
import { usersReducer } from './reducers/users/users.reducer';

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducers,
  parties: partiesReducer,
  messages: messagesReducer,
  trips: tripsReducer,
  wishlists: wishlistsReducer,
  users: usersReducer,
};
