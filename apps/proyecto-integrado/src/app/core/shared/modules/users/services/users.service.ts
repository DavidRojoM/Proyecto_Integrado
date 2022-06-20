import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../domain/interfaces/user.interface';
import { Observable } from 'rxjs';
import { buildFormData } from '../../../../../common/utils/build-form-data';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = `${environment.GATEWAY_URL}/users`;

  constructor(private readonly http: HttpClient) {}

  findUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUser(user: User): Observable<User> {
    const formdata = buildFormData({
      ...user,
    });
    return this.http.put<User>(this.url, formdata);
  }

  deleteUser(userId: string): Observable<{ userId: string }> {
    return this.http.delete<{ userId: string }>(`${this.url}/${userId}`);
  }
}
