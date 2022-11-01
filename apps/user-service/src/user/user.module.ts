import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
