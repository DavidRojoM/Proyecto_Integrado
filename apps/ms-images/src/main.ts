import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  const port = ENVIRONMENT.IMAGES_PORT || 3001;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `**IMAGES** Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
