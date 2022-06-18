import { User } from '../../../users/domain/interfaces/user.interface';
import { Destination } from '../../../trips/domain/trips.interface';
import { GenderEnum } from '../enums/gender.enum';

export interface Wishlist {
  id?: number;
  user: User;
  destination: Destination;
  ageFilter?: number;
  genderFilter?: GenderEnum;
  departureFilter?: Date;
}

export interface WishlistInput {
  userId: string;
  destinationId: number;
  ageFilter?: number;
  genderFilter?: GenderEnum;
  departureFilter?: Date;
}
