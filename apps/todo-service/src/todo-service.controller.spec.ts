import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceController } from './todo-service.controller';
import { TodoServiceService } from './todo-service.service';

describe('TodoServiceController', () => {
  let todoServiceController: TodoServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoServiceController],
      providers: [TodoServiceService],
    }).compile();

    todoServiceController = app.get<TodoServiceController>(TodoServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todoServiceController.getHello()).toBe('Hello World!');
    });
  });
});
