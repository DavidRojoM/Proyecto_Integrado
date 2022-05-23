import { UserDto } from '../users/user.dto';
import { PartyDto } from '../parties/party.dto';

export class MessageDto {
  message: string;
  createdAt: Date;
  user: UserDto;
  party: PartyDto;
}
