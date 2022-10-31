import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { preSave, User, UserSchema } from './model/user';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', preSave);
          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
