import { Module } from '@nestjs/common';
import { TodoServiceController } from './todo-service.controller';
import { TodoServiceService } from './todo-service.service';

@Module({
  imports: [],
  controllers: [TodoServiceController],
  providers: [TodoServiceService],
})
export class TodoServiceModule {}
