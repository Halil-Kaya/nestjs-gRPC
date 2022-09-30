import { Controller, Get } from '@nestjs/common';
import { TodoServiceService } from './todo-service.service';

@Controller()
export class TodoServiceController {
  constructor(private readonly todoServiceService: TodoServiceService) {}

  @Get()
  getHello(): string {
    return this.todoServiceService.getHello();
  }
}
