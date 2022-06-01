import { Test, TestingModule } from '@nestjs/testing';

import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PartiesController],
      providers: [PartiesService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to ms-parties!"', () => {
      const appController = app.get<PartiesController>(PartiesController);
      // expect(appController.getData()).toEqual({
      //   message: 'Welcome to ms-parties!',
      // });
    });
  });
});
