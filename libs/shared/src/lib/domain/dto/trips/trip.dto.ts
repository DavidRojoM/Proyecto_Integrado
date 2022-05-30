import { DestinationDto } from './destination.dto';
import { HotelDto } from './hotel.dto';
import { TransportDto } from './transport.dto';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TripDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  from: Date;

  @IsNotEmpty()
  @IsString()
  to: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => DestinationDto)
  destination: DestinationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HotelDto)
  hotel: HotelDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TransportDto)
  transport: TransportDto;
}
