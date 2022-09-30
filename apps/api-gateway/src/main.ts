import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3032);
  return app;
}

bootstrap().then(async (app) => {
  console.log(`app is running on : ${await app.getUrl()}`);
});
