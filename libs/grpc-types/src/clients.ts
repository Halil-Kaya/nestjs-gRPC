import { join } from "path";
import { AuthProto, UserProto } from "grpc-types/grpc-types/index";
import { Transport } from "@nestjs/microservices";
import { AuthConfig, UserConfig } from "grpc-types/grpc-types/config";

export const AuthClient: any = {
  name: AuthProto.AUTH_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: AuthProto.AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, AuthConfig.path),
    url: `${AuthConfig.hostname}:${AuthConfig.port}`,
    loader: AuthConfig.loader
  }
};

export const UserClient: any = {
  name: UserProto.USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: UserProto.USER_PACKAGE_NAME,
    protoPath: join(__dirname, UserConfig.path),
    url: `${UserConfig.hostname}:${UserConfig.port}`,
    loader: UserConfig.loader
  }
};
