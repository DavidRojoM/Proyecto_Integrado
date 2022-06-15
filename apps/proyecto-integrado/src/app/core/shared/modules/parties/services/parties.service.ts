import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  JoinPartyResponse,
  PartyInput,
  PartyOutput,
} from '../domain/parties.interface';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../users/domain/interfaces/user.interface';
import { map } from 'rxjs/operators';
import { v4 as uuidV4 } from 'uuid';

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
    });
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
}
