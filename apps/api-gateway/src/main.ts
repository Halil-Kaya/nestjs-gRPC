import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "filters/filters";
import { TransformInterceptor } from "interceptors/interceptors";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3032);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`gateway is running on : ${await app.getUrl()}`);
});
