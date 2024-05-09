import { Test, TestingModule } from '@nestjs/testing';
import { OrderHistoryController } from './order-history.controller';

describe('OrderHistoryController', () => {
  let controller: OrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderHistoryController],
    }).compile();

    controller = module.get<OrderHistoryController>(OrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
