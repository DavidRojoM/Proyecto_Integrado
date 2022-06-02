import { Test } from '@nestjs/testing';

import { CommsService } from './comms.service';

describe('AppService', () => {
  let service: CommsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = app.get<CommsService>(CommsService);
  });

  describe('getData', () => {
    it('should return "Welcome to ms-comms!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to ms-comms!' });
    });
  });
});
