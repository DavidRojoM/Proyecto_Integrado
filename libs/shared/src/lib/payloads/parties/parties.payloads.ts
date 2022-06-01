import {
  ErrorPayload,
  Party,
  PartyDto,
  Result,
  UserParty,
  UserPartyDto,
} from '@proyecto-integrado/shared';

export type FindAllPartiesResponse = Result<PartyDto[], ErrorPayload>;
export type FindPartyByIdResponse = Result<PartyDto, ErrorPayload>;
export type InsertPartyResponse = Result<PartyDto, ErrorPayload>;
export type UpdatePartyResponse = Result<PartyDto, ErrorPayload>;
export type DeletePartyResponse = Result<PartyDto, ErrorPayload>;
export type JoinPartyResponse = Result<UserPartyDto, ErrorPayload>;

export type FindAllParties = Result<Party[], ErrorPayload>;
export type FindPartyById = Result<Party, ErrorPayload>;
export type InsertParty = Result<Party, ErrorPayload>;
export type UpdateParty = Result<Party, ErrorPayload>;
export type DeleteParty = Result<Party, ErrorPayload>;
export type JoinParty = Result<UserParty, ErrorPayload>;