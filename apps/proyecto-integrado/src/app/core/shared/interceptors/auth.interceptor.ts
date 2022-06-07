import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly localStorageService: LocalStorageService) {}

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
      tap((res: any) => {
        if (
          res.type === 4 &&
          (res?.url?.includes(environment.GATEWAY_URL) ||
            res?.url?.includes(environment.IMAGES_URL))
        ) {
          const headers = res.headers;
          if (headers.get('authorization')) {
            this.localStorageService.setItem(
              'access_token',
              headers.get('authorization').split(' ')[1]
            );
          }
        }
      }),
      catchError((err: any) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          //store logout
        }
        return next.handle(newReq);
      })
    );
  }
}
