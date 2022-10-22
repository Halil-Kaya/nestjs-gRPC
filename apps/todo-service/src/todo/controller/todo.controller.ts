import { Controller } from "@nestjs/common";
import { TodoService } from "../service/todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }


}