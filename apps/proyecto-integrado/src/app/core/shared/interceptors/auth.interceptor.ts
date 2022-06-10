import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { AuthActions } from '../../../state/actions/auth/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly store$: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: request.headers.set(
        'authorization',
        `Bearer ${this.localStorageService.getItem('access_token')}`
      ),
    });

    return next.handle(newReq).pipe(
      tap((res: HttpEvent<any>) => {
        if (
          res.type === HttpEventType.Response &&
          (res?.url?.includes(environment.GATEWAY_URL) ||
            res?.url?.includes(environment.IMAGES_URL))
        ) {
          const authorization = res.headers.get('authorization');
          if (authorization) {
            this.localStorageService.setItem(
              'access_token',
              authorization.split(' ')[1]
            );
          }
        }
      }),
      catchError((err: any) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.store$.dispatch(AuthActions.logoutRequest());
        }
        return next.handle(newReq);
      })
    );
  }
}
