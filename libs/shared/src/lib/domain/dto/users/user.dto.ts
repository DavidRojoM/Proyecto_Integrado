import { PartyDto } from '../parties/party.dto';
import { MessageDto } from '../comms/message.dto';
import { Roles } from '../../enums/roles.enum';

export class UserDto {
  id: string;
  email: string;
  username: string;
  role: Roles;
  password: string;
  banned: boolean;
  image?: string;
  bankAccount: string;
  nationality: string;
  parties: PartyDto[];
  messages: MessageDto[];
}
