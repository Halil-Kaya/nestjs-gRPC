import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcClients } from 'grpc-types/grpc-types';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '<_._._>',
      signOptions: { expiresIn: '10d' },
    }),
    ClientsModule.register([GrpcClients.UserClient]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
