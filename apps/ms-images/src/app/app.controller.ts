import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import {
  ImageInput,
  ImageUploadResponse,
  PayloadActions,
} from '@proyecto-integrado/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PayloadActions.IMAGES.CREATE)
  create(image: ImageInput): Promise<ImageUploadResponse> {
    return this.appService.uploadImage(image);
  }
}
