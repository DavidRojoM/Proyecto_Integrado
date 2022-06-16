import { Trip } from '@proyecto-integrado/shared';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTripPartyResponseDto {
  @IsNotEmpty()
  @IsString()
  partyId: string;

  @IsNotEmpty()
  trip: Trip;
}
