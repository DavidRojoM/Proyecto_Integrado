import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '../../../services/snackbar.service';
import { v4 as uuidV4 } from 'uuid';
import { Credentials } from '../domain/credentials.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../domain/login-response.interface';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../users/domain/interfaces/user.interface';
import { LocalStorageService } from '../../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly snackbarService: SnackbarService,
    private readonly localStorageService: LocalStorageService
  ) {}

  signup(user: User): Observable<User> {
    console.log(user);
    const formdata = this.buildFormData({
      ...user,
      id: uuidV4(),
    });

    return this.http.post<User>(`${environment.GATEWAY_URL}/users`, formdata);
  }

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.GATEWAY_URL}/auth`,
      credentials
    );
  }

  check(): Observable<LoginResponse> {
    const access_token = this.localStorageService.getItem('access_token');
    return this.http.post<LoginResponse>(
      `${environment.GATEWAY_URL}/auth/check`,
      {
        access_token,
      }
    );
  }

  private buildFormData(user: any) {
    const formdata = new FormData();
    for (const key in user) {
      if (key === 'image') {
        formdata.append(key, user[key][0]);
      } else {
        formdata.append(key, user[key]);
      }
    }
    return formdata;
  }
}
