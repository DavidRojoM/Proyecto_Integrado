import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { v4 as uuidV4 } from 'uuid';
import { catchError, tap } from 'rxjs';
import { SnackbarService } from '../../../services/snackbar.service';
import { Credentials } from '../../auth/domain/credentials.interface';
import { LoginResponse } from '../../auth/domain/login-response.interface';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly http: HttpClient,
    private readonly snackbarService: SnackbarService
  ) {}

  signup(user: any): any {
    user.id = uuidV4();
    const formdata = this.buildFormData(user);
    return this.http.post(`${environment.GATEWAY_URL}/users`, formdata).pipe(
      tap(() => {
        this.snackbarService.open('User created successfully 🥳', 'OK', 2000);
      }),
      catchError(() => {
        this.snackbarService.open('User already exists 😢', 'DISMISS', 2000);
        return [];
      })
    );
  }

  login(credentials: Credentials) {
    return this.http
      .post<LoginResponse>(`${environment.GATEWAY_URL}/auth`, credentials)
      .pipe(
        catchError((error) => {
          const message =
            `${error.error.statusText} 😢` || 'Invalid credentials 😢';
          this.snackbarService.open(message, 'DISMISS', 2000);
          return [];
        })
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
