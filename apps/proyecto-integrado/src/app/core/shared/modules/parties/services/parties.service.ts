import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartyOutput } from '../domain/parties.interface';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<PartyOutput[]> {
    return this.http.get<PartyOutput[]>(`${environment.GATEWAY_URL}/parties`);
  }
}
