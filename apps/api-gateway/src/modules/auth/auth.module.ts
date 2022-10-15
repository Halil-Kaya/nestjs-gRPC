import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AuthController } from "./auth.controller";
import { AuthProto } from "grpc-types/grpc-types";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AuthProto.AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AuthProto.AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, "./../auth.proto"),
          url: "localhost:50051",
          loader: {
            keepCase: true,
            enums: String
          }
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: []
})
export class AuthModule {
}
