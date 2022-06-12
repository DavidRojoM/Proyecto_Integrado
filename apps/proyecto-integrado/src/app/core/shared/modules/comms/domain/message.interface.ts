import { User } from '../../users/domain/interfaces/user.interface';

export interface MessageInput {
  userId: string;
  message: string;
  partyId: string;
}

export interface MessageOutput {
  user: Partial<User>;
  message: string;
  partyId: string;
  createdAt: Date;
}
