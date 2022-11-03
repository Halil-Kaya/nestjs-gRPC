import { join } from "path";
import { AuthProto, TodoProto, UserProto } from "grpc-types/grpc-types/index";
import { Transport } from "@nestjs/microservices";
import {
  AuthConfig,
  TodoConfig,
  UserConfig
} from "grpc-types/grpc-types/config";

export const AuthServer: any = {
  name: AuthProto.AUTH_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: AuthProto.AUTH_PACKAGE_NAME,
    protoPath: join(__dirname, AuthConfig.path),
    url: `${AuthConfig.localHostname}:${AuthConfig.port}`,
    loader: AuthConfig.loader
  }
};

export const UserServer: any = {
  name: UserProto.USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: UserProto.USER_PACKAGE_NAME,
    protoPath: join(__dirname, UserConfig.path),
    url: `${UserConfig.localHostname}:${UserConfig.port}`,
    loader: UserConfig.loader
  }
};

export const TodoServer: any = {
  name: TodoProto.TODO_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: TodoProto.TODO_PACKAGE_NAME,
    protoPath: join(__dirname, TodoConfig.path),
    url: `${TodoConfig.localHostname}:${TodoConfig.port}`,
    loader: TodoConfig.loader
  }
};
