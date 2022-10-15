import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../user-service/src/app.module";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  await app.startAllMicroservices();
  return app;
}

bootstrap().then(async (app) => {
  console.log(`todo-service microservice is running`);
});
