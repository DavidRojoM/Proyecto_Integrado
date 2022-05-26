import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [ENVIRONMENT.RMQ_URL],
      queue: QUEUES.IMAGES,
      queueOptions: {
        durable: true,
      },
    },
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useStaticAssets(join(__filename, '..', 'public'), {
    prefix: '/public',
  });
  const port = ENVIRONMENT.IMAGES_PORT || 3001;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `**IMAGES** Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
