import { User } from '../../users/domain/interfaces/user.interface';

export interface PartyInput {
  id: string;
  name: string;
}

export interface PartyOutput {
  id: string;
  name: string;
  users: User[];
}
