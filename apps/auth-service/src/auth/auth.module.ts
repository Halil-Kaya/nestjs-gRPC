import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserProto } from "grpc-types/grpc-types";
import { join } from "path";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "<_._._>",
      signOptions: { expiresIn: "1d" }
    }),
    ClientsModule.register([
      {
        name: UserProto.USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: UserProto.USER_PACKAGE_NAME,
          protoPath: join(__dirname, "./../../../../libs/grpc-types/src/protos/user.proto"),
          url: "localhost:50050"
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
