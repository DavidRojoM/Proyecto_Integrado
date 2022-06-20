import { TripDto } from '../trips/trip.dto';
import { MessageDto } from '../comms/message.dto';
import { UserPartyDto } from '../users/user-party.dto';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../users/user.dto';
import { Trip } from '../../models/trips/trip.model';
import { PartyStatusEnum } from '../../enums/party-status.enum';

export class PartyDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  // @IsOptional()
  // @Type(() => TripDto)
  // trip: TripDto;
  trip: Trip;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => TripDto)
  messages?: MessageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => UserPartyDto)
  users?: UserDto[];

  @IsEnum(PartyStatusEnum)
  status: PartyStatusEnum;
}
