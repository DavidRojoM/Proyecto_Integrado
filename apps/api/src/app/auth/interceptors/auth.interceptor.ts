import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
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

    const user = await this.authService.checkAuth({ access_token });

    if (!user) {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
