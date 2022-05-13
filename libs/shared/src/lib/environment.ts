import { config } from 'dotenv';
config();

export const ENVIRONMENT = {
  RMQ_URL: 'amqp://localhost:5672',
  GATEWAY_PORT: process.env.GATEWAY_PORT || 3000,
};

export const QUEUES = {
  GATEWAY: 'GATEWAY_QUEUE',
  AUTH: 'AUTH_QUEUE',
  USERS: 'USERS_QUEUE',
  IMAGES: 'IMAGES_QUEUE',
};
