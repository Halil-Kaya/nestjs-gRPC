import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../model/todo';
import { LeanDocument, Model } from 'mongoose';
import { TodoProto } from 'grpc-types/grpc-types';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create(dto: TodoProto.CreateDto): Promise<TodoDocument> {
    const todo = new this.todoModel(dto);
    return todo.save();
  }

  async fetch(user_id: string): Promise<LeanDocument<TodoDocument[]>> {
    return this.todoModel.find({ userId: user_id });
  }
}
