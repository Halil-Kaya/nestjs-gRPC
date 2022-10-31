import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repository/todo.repository';
import { TodoProto } from 'grpc-types/grpc-types';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(dto: TodoProto.CreateDto): Promise<TodoProto.CreateAck> {
    const todo = await this.todoRepository.create(dto);
    return {
      todo,
    };
  }

  async fetch(dto: TodoProto.FetchDto): Promise<TodoProto.FetchAck> {
    const todos = await this.todoRepository.fetch(dto.user_id);
    return {
      todos,
    };
  }
}
