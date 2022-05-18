import { config } from 'dotenv';
config();

export const ENVIRONMENT = {
  RMQ_URL: 'amqp://localhost:5672',
  GATEWAY_PORT: process.env.GATEWAY_PORT || 3000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || '5m',
};

export const QUEUES = {
  GATEWAY: 'GATEWAY_QUEUE',
  AUTH: 'AUTH_QUEUE',
  USERS: 'USERS_QUEUE',
  IMAGES: 'IMAGES_QUEUE',
  MAILER: 'MAILER_QUEUE',
  COMMS: 'COMMS_QUEUE',
};
