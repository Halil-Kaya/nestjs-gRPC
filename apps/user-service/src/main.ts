import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { GrpcClients } from "grpc-types/grpc-types";

async function bootstrap() {
  global.NODE_ID = `NODE_ID # ${(Math.random() * 10).toFixed(0)}`;
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>(GrpcClients.UserClient);
  await app.startAllMicroservices();
  await app.listen(3033);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`user-service microservice is running on : ${await app.getUrl()}`);
});
