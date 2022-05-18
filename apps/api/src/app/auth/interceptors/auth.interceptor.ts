import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const token = context.switchToHttp().getRequest().headers['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }

    const access_token = token.split(' ')[1];

    if (!access_token) {
      throw new UnauthorizedException();
    }

    const loginResponse = await this.authService.checkAuth({ access_token });

    if (!loginResponse) {
      throw new UnauthorizedException();
    }
    return next.handle().pipe(
      tap(() => {
        context
          .switchToHttp()
          .getResponse()
          .setHeader('authorization', `Bearer ${loginResponse.access_token}`);
      })
    );
  }
}
