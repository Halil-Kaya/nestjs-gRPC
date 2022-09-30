import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "filters/filters";
import { TransformInterceptor } from "./core/Interceptors/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3032);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`app is running on : ${await app.getUrl()}`);
});
