import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    await this.loggingService.logRequest(request, 'REQUEST');
    return next.handle().pipe(
      tap({
        next: async (response) => {
          await this.loggingService.logResponse(response, 'RESPONSE');
        },
        error: async (error) => {
          await this.loggingService.logResponse(error, 'ERROR');
        },
      })
    );
  }
}
