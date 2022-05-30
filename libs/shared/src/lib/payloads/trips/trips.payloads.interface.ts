import { ErrorPayload, Result, TripDto } from '@proyecto-integrado/shared';

export type FindAllTripsResponse = Result<TripDto[], ErrorPayload>;

export type InsertTripResponse = Result<TripDto, ErrorPayload>;
