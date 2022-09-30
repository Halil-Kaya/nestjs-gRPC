import { NestFactory } from '@nestjs/core';
import { TodoServiceModule } from './todo-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoServiceModule);
  await app.listen(3000);
}
bootstrap();
