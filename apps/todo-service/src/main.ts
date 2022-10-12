import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../user-service/src/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { TodoProto } from "grpc-types/grpc-types";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: TodoProto.TODO_PACKAGE_NAME,
      protoPath: join(__dirname, "./../../../libs/grpc-types/src/protos/todo.proto"),
      url: "localhost:50055",
      loader: {
        keepCase: true,
        enums: String,
        longs: Number
      }
    }
  });
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`todo-service microservice is running`);
});
