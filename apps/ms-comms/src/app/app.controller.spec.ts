import { Test, TestingModule } from '@nestjs/testing';

import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [CommsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to ms-comms!"', () => {
      const appController = app.get<CommsController>(CommsController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to ms-comms!',
      });
    });
  });
});
