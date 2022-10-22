import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { TodoService } from "../service/todo.service";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { GrpcLogInterceptor } from "interceptors/interceptors";
import { TodoProto } from "grpc-types/grpc-types";

@UseFilters(GrpcAllExceptionsFilter)
@UseInterceptors(GrpcLogInterceptor)
@Controller("todo")
@TodoProto.TodoServiceControllerMethods()
export class TodoController implements TodoProto.TodoServiceController {
  constructor(private readonly todoService: TodoService) {
  }

  create(request: TodoProto.CreateDto): Promise<TodoProto.CreateAck> {
    return this.todoService.create(request);
  }

}