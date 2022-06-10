import { AuthState } from './auth.state.interface';
import { PartiesState } from './parties.state.interface';

export interface AppState {
  auth: AuthState;
  parties: PartiesState;
}
