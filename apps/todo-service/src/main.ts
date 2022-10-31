import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GrpcClients } from 'grpc-types/grpc-types';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>(GrpcClients.TodoClient);
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`todo-service microservice is running`);
});
