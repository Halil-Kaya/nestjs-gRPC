import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { UserController } from "./user.controller";
import { UserProto } from "grpc-types/grpc-types";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: UserProto.USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: UserProto.USER_PACKAGE_NAME,
          protoPath: join(__dirname, "./user.proto")
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: []
})
export class UserModule {
}