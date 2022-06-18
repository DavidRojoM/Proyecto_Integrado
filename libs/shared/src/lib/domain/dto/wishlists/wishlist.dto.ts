import { GenderEnum } from '../../enums/gender.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class WishlistDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  ageFilter?: number;

  @IsEnum(GenderEnum)
  @IsOptional()
  genderFilter?: GenderEnum;

  @IsString()
  @IsOptional()
  departureFilter?: Date;

  @IsNumber()
  @IsNotEmpty()
  destinationId: number;
}
