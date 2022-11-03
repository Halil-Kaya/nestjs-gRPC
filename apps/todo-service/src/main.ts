import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { GrpcServers } from "grpc-types/grpc-types";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>(GrpcServers.TodoServer);
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`todo-service microservice is running`);
});
