import { AuthState } from './auth.state.interface';
import { PartiesState } from './parties.state.interface';
import { MessagesState } from './messages.state.interface';

export interface AppState {
  auth: AuthState;
  parties: PartiesState;
  messages: MessagesState;
}
