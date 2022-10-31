import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoProto } from 'grpc-types/grpc-types';
import { ClientGrpc } from '@nestjs/microservices';
import { TodoCreateDto } from './dto';
import { JWTGuard } from '../../core/guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { IUser } from 'interfaces/interfaces/IUser';

@Controller('todo')
export class TodoController implements OnModuleInit {
  private todoService: TodoProto.TodoServiceClient;

  constructor(
    @Inject(TodoProto.TODO_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.todoService = this.client.getService<TodoProto.TodoServiceClient>(
      TodoProto.TODO_SERVICE_NAME,
    );
  }

  @UseGuards(JWTGuard)
  @Post()
  async create(@Body() dto: TodoCreateDto, @CurrentUser() user: IUser) {
    return this.todoService.create({
      ...dto,
      userId: user._id,
    });
  }

  @Get()
  @UseGuards(JWTGuard)
  async fetch(@CurrentUser() user: IUser) {
    return this.todoService.fetch({ user_id: user._id });
  }
}
