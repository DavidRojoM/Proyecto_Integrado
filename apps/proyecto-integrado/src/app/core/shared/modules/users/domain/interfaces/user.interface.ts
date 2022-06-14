import { PartyOutput } from '../../../parties/domain/parties.interface';

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  nationality: string;
  bankAccount: string;
  image: string;
  role: string;
  banned?: string;
  status?: string;
  balance?: number;
  parties: PartyOutput[];
}
