import { TripDto } from '@proyecto-integrado/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTripToPartyDto {
  @IsNotEmpty()
  @IsString()
  partyId: string;

  @IsNotEmpty()
  trip: TripDto;
}
