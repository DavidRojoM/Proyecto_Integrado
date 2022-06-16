import { User } from '../../users/domain/interfaces/user.interface';
import { Trip } from '../../trips/domain/trips.interface';

export interface PartyInput {
  id: string;
  name: string;
}

export interface PartyOutput {
  id: string;
  name: string;
  users: User[];
  trip?: Trip;
  status?: string;
}

export interface JoinPartyResponse {
  user: User;
  party: PartyOutput;
  status: string;
}

export interface AddTripToParty {
  partyId: string;
  trip: Trip;
}
