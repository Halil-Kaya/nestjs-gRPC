import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcClients } from 'grpc-types/grpc-types';
import { TodoController } from './todo.controller';
import { JWTStrategy } from '../../core/strategies';

@Module({
  imports: [
    ClientsModule.register([GrpcClients.TodoClient, GrpcClients.UserClient]),
  ],
  controllers: [TodoController],
  providers: [JWTStrategy],
})
export class TodoModule {}
