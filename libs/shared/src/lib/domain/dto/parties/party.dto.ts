import { TripDto } from '../trips/trip.dto';
import { MessageDto } from '../comms/message.dto';
import { UserPartiesDto } from '../users/user-parties.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PartyDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @Type(() => TripDto)
  trip: TripDto;

  @IsOptional()
  messages: MessageDto[];

  @IsOptional()
  users: UserPartiesDto[];
}
