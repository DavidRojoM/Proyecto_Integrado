import { IsNumber, IsOptional, IsString } from 'class-validator';

export class HotelDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsNumber()
  nightPrice: number;

  @IsString()
  image: string;
}
