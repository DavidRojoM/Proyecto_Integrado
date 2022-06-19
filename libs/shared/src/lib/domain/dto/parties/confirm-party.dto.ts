import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPartyDto {
  @IsNotEmpty()
  @IsString()
  partyId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export interface ConfirmPartyResponseDto {
  userId: string;
  partyId: string;
  balances: number;
}
