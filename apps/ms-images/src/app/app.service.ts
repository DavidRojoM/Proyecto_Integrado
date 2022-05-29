import { Injectable } from '@nestjs/common';
import { ImageInput, ImageUploadResponse } from '@proyecto-integrado/shared';

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

    if (image.size > 1000000) {
      return {
        ok: false,
        error: {
          statusCode: 400,
          statusText: 'File too large',
        },
      };
    }
  }
}
