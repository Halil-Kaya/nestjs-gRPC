import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { GrpcServers } from "grpc-types/grpc-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>(GrpcServers.UserServer);
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`user-service microservice is running`);
});
