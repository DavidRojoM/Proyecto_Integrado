import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { concatMap, Observable } from 'rxjs';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      concatMap(async (response) => {
        await this.loggingService.log(response, 'API_GATEWAY');
      })
    );
  }
}
