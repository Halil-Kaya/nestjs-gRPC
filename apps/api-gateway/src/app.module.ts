import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [UserModule, AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
