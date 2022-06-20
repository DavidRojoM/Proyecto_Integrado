import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  AddTripToParty,
  JoinPartyResponse,
  PartyInput,
  PartyOutput,
} from '../domain/parties.interface';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../users/domain/interfaces/user.interface';
import { map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';
import { TripInput } from '../../trips/domain/trips.interface';

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<PartyOutput[]> {
    return this.http.get<PartyOutput[]>(`${environment.GATEWAY_URL}/parties`);
  }

  createParty(name: string): Observable<PartyInput> {
    return this.http.post<PartyInput>(`${environment.GATEWAY_URL}/parties`, {
      name,
      id: uuidV4(),
      status: 'PENDING',
    });
  }

  updateParty(party: PartyInput): Observable<PartyInput> {
    return this.http.put<PartyInput>(
      `${environment.GATEWAY_URL}/parties`,
      party
    );
  }

  deleteParty(partyId: string): Observable<{ partyId: string }> {
    return this.http.delete<{ partyId: string }>(
      `${environment.GATEWAY_URL}/parties/${partyId}`
    );
  }

  joinParty(
    userId: string,
    partyId: string
  ): Observable<{ user: User; party: PartyOutput }> {
    return this.http
      .post<JoinPartyResponse>(`${environment.GATEWAY_URL}/parties/join`, {
        userId,
        partyId,
      })
      .pipe(
        map(({ party, user, status }: JoinPartyResponse) => ({
          user,
          party: {
            ...party,
            status,
          },
        }))
      );
  }

  leaveParty(
    userId: string,
    partyId: string
  ): Observable<{ userId: string; partyId: string }> {
    return this.http.post<{ userId: string; partyId: string }>(
      `${environment.GATEWAY_URL}/parties/leave`,
      { userId, partyId }
    );
  }

  becomeOrganizer(
    userId: string,
    partyId: string
  ): Observable<{ user: User; party: PartyOutput }> {
    return this.http
      .post<JoinPartyResponse>(`${environment.GATEWAY_URL}/parties/organizer`, {
        userId,
        partyId,
      })
      .pipe(
        map(({ party, user, status }: JoinPartyResponse) => ({
          user,
          party: {
            ...party,
            status,
          },
        }))
      );
  }

  createTrip(addTripToPartConfig: AddTripToParty): Observable<AddTripToParty> {
    const tripInput: TripInput = {
      id: addTripToPartConfig.trip.id,
      from: addTripToPartConfig.trip.from,
      destinationId: addTripToPartConfig.trip.destination?.id,
      hotelId: addTripToPartConfig.trip.hotel?.id,
      transportId: addTripToPartConfig.trip.transport?.id,
      to: addTripToPartConfig.trip.to,
    };
    return this.http
      .post<AddTripToParty>(`${environment.GATEWAY_URL}/parties/trip`, {
        trip: tripInput,
        partyId: addTripToPartConfig.partyId,
      })
      .pipe(
        tap((response: AddTripToParty) => {
          console.log('response', response);
        })
      );
  }

  checkout(
    partyId: string,
    userId: string
  ): Observable<{ partyId: string; userId: string; balances: number }> {
    return this.http.post<{
      partyId: string;
      userId: string;
      balances: number;
    }>(`${environment.GATEWAY_URL}/parties/checkout`, {
      partyId,
      userId,
    });
  }

  cancelCheckout(
    partyId: string,
    userId: string
  ): Observable<{ partyId: string; userId: string; balances: number }> {
    return this.http.delete<{
      partyId: string;
      userId: string;
      balances: number;
    }>(`${environment.GATEWAY_URL}/parties/checkout`, {
      body: {
        partyId,
        userId,
      },
    });
  }

  confirmParty(
    partyId: string,
    userId: string
  ): Observable<{ partyId: string; userId: string; balances: number }> {
    return this.http.post<{
      partyId: string;
      userId: string;
      balances: number;
    }>(`${environment.GATEWAY_URL}/parties/confirm`, { userId, partyId });
  }
}
