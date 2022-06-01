import { Test } from '@nestjs/testing';

import { PartiesService } from './parties.service';

describe('AppService', () => {
  let service: PartiesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [PartiesService],
    }).compile();

    service = app.get<PartiesService>(PartiesService);
  });

  describe('getData', () => {
    it('should return "Welcome to ms-parties!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to ms-parties!' });
    });
  });
});
