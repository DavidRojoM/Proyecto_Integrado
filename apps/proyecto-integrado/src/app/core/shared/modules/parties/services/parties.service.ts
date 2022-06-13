import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JoinPartyResponse, PartyOutput } from '../domain/parties.interface';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../users/domain/interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<PartyOutput[]> {
    return this.http.get<PartyOutput[]>(`${environment.GATEWAY_URL}/parties`);
  }

  joinParty(userId: string, partyId: string): Observable<User> {
    return this.http
      .post<JoinPartyResponse>(`${environment.GATEWAY_URL}/parties/join`, {
        userId,
        partyId,
      })
      .pipe(
        map((response: JoinPartyResponse) => ({
          ...response.user,
          status: response.status,
        }))
      );
  }
}
