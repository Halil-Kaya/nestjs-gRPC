import { Module } from "@nestjs/common";
import { TodoController } from "./controller/todo.controller";
import { TodoService } from "./service/todo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./model/todo";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Todo.name, useFactory: () => TodoSchema
      }
    ])
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {
}