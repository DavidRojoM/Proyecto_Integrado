import { Injectable } from '@nestjs/common';
import { ImageInput, ImageUploadResponse } from '@proyecto-integrado/shared';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  async uploadImage(image: ImageInput): Promise<ImageUploadResponse> {
    const mimeType = image.mimeType.toUpperCase();

    if (!mimeType.includes('IMAGE')) {
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

    //TODO: THIS WILL DO FOR NOW, BUT SHOULD BE REPLACED FOR THE NEW PICTURE
    const date = new Date().getTime();
    try {
      fs.writeFileSync(
        join(
          __filename,
          '..',
          'public',
          `${date}${image.userId}.${fileExtension}`
        ),
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
        url: `http://localhost:3001/public/${date}${image.userId}.${fileExtension}`,
      },
    };
  }
}
