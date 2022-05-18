import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';

const promiseWriteFIle = promisify(writeFile);
//TODO: Add LoggingInterceptor
@Injectable()
export class LoggingService {
  async log(request: Request, context: string): Promise<void> {
    await promiseWriteFIle('./', JSON.stringify(request), 'utf-8');
  }
}
