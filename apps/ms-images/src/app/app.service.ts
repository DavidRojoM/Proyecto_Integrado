import { Injectable } from '@nestjs/common';
import { ImageInput, ImageUploadResponse } from '@proyecto-integrado/shared';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to ms-images!' };
  }

  async uploadImage(image: ImageInput): Promise<ImageUploadResponse> {
    if (!image.mimeType.toUpperCase().includes('IMAGE')) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'Invalid mime type',
        },
      };
    }

    //10Mb
    if (image.size > 10485760) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'File too large',
        },
      };
    }

    const fileExtension = image.mimeType.split('/')[1];

    try {
      fs.writeFileSync(
        join(__filename, '..', 'public', `${image.userId}.${fileExtension}`),
        Buffer.from(image.buffer),
        {
          encoding: 'binary',
          flag: 'w',
        }
      );
    } catch (e) {
      return {
        ok: false,
        error: {
          statusCode: 500,
          statusText: 'Unable to upload image',
        },
      };
    }

    return {
      ok: true,
      value: {
        url: `http://localhost:3001/public/${image.userId}.${fileExtension}`,
      },
    };
  }
}
