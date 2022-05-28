import { TripDto } from '../trips/trip.dto';
import { MessageDto } from '../comms/message.dto';
import { UserPartiesDto } from '../users/user-parties.dto';

export class PartyDto {
  id: string;
  name: string;
  trip: TripDto;
  messages: MessageDto[];
  users: UserPartiesDto[];
}
