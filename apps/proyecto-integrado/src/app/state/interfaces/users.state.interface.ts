import { User } from '../../core/shared/modules/users/domain/interfaces/user.interface';

export interface UsersState {
  users: User[];
  loading: boolean;
  error?: string;
}
