import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { ENVIRONMENT, QUEUES } from '../../../../shared/src/lib/environment';

export const RMQCONFIG: ClientsModuleOptions = [
  {
    name: 'AUTH_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.AUTH,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
  {
    name: 'GATEWAY_SERVICE',
    transport: Transport.RMQ,
    options: {
      queue: QUEUES.GATEWAY,
      urls: [ENVIRONMENT.RMQ_URL],
      queueOptions: {
        durable: true,
      },
    },
  },
];
