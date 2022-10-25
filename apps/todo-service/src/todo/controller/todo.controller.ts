import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { TodoProto } from "grpc-types/grpc-types";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { GrpcLogInterceptor } from "interceptors/interceptors";
import { TodoService } from "../service/todo.service";

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller("todo")
@TodoProto.TodoServiceControllerMethods()
export class TodoController implements TodoProto.TodoServiceController {
  constructor(private readonly todoService: TodoService) {
  }

  async create(request: TodoProto.CreateDto): Promise<TodoProto.CreateAck> {
    return this.todoService.create(request);
  }

  fetch(request: TodoProto.FetchDto): Promise<TodoProto.FetchAck> {
    return this.todoService.fetch(request);
  }

}