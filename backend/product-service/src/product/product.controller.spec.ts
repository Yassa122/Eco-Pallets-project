import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { describe, beforeEach, it } from 'node:test';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
function expect(controller: ProductController) {
  throw new Error('Function not implemented.');
}

