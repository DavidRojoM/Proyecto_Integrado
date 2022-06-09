import { User } from '../../core/shared/modules/users/domain/interfaces/user.interface';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
  user?: User;
  userAdded?: boolean;
}
