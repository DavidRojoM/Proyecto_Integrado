import { IsNotEmpty, IsString } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  partyId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export interface CheckoutResponseDto {
  partyId: string;
  userId: string;
  balances: number;
}
