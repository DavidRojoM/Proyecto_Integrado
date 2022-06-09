import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { promisify } from 'util';
import { writeFile } from 'graceful-fs';
const promiseWriteFile = promisify(writeFile);
@Injectable()
export class LoggingService {
  async logRequest(request: Request, context: string): Promise<void> {
    const record = {
      body: JSON.stringify(request.body),
      headers: JSON.stringify(request.headers),
      method: request.method,
      hostname: `${request.hostname}${request.url}`,
      query: JSON.stringify(request.query),
      ip: request.ip,
    };

    await this.log(context, JSON.stringify(record));
  }

  async logResponse(response: any, context: string): Promise<void> {
    const record =
      typeof response === 'string' ? response : JSON.stringify(response);
    await this.log(context, JSON.stringify(record));
  }

  private async log(context: string, message: string): Promise<void> {
    const date = new Date().toISOString();
    await promiseWriteFile(
      'log',
      `[${date}]->${context.toUpperCase()}: ${message}\n`,
      {
        flag: 'a',
      }
    );
  }
}
