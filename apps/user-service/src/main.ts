import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { UserProto } from "grpc-types/grpc-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: UserProto.USER_PACKAGE_NAME,
      protoPath: join(__dirname, "./user.proto"),
      loader: {
        keepCase: true,
        enums: String
      }
    }
  });
  await app.startAllMicroservices();
  await app.listen(3033);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`user-service microservice is running`);
});
