import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ENVIRONMENT, QUEUES } from '@proyecto-integrado/shared';
import { Transport } from '@nestjs/microservices';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [ENVIRONMENT.RMQ_URL],
      queue: QUEUES.GATEWAY,
      queueOptions: {
        durable: true,
      },
    },
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const port = ENVIRONMENT.GATEWAY_PORT || 3000;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `**GATEWAY** Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
