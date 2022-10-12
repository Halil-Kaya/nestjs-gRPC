import { Controller, UseFilters } from "@nestjs/common";
import { GrpcAllExceptionsFilter } from "filters/filters";
import { TodoProto } from "grpc-types/grpc-types";

@UseFilters(GrpcAllExceptionsFilter)
@Controller("todo")
@TodoProto.TodoServiceControllerMethods()
export class TodoController {
  constructor() {
  }

  ExRequiredFields(request: TodoProto.ExRequiredFieldDto): TodoProto.ExRequiredFieldDto {
    console.log("exRequiredFields:request -> ", request);
    return request;
  }
}