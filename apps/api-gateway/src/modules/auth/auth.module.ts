import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { AuthController } from "./auth.controller";
import { GrpcClients } from "grpc-types/grpc-types";

@Module({
  imports: [
    ClientsModule.register([
      GrpcClients.AuthClient
    ])
  ],
  controllers: [AuthController],
  providers: []
})
export class AuthModule {
}
