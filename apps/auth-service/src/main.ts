import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AuthProto } from "grpc-types/grpc-types";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: AuthProto.AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, "./../../../libs/grpc-types/src/protos/auth.proto"),
      url: "localhost:50051",
      loader: {
        keepCase: true,
        enums: String
      }
    }
  });
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`auth-service microservice is running`);
});
