import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "../model/todo";
import { Model } from "mongoose";

@Injectable()
export class TodoRepository {

  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {
  }

}