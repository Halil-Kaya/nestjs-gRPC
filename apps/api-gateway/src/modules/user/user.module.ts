import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { UserController } from "./user.controller";
import { GrpcClients } from "grpc-types/grpc-types";

@Module({
  imports: [ClientsModule.register([GrpcClients.UserClient])],
  controllers: [UserController],
  providers: []
})
export class UserModule {
}
