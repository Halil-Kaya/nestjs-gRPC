import { join } from 'path';
import { UserProto } from 'grpc-types/grpc-types/index';
import { Transport } from '@nestjs/microservices';
import { UserConfig } from 'grpc-types/grpc-types/config';

export const UserGrpcServer: any = {
  name: UserProto.USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: UserProto.USER_PACKAGE_NAME,
    protoPath: join(__dirname, UserConfig.path),
    url: `${UserConfig.hostname}:${UserConfig.port}`,
    loader: UserConfig.loader,
  },
};
export const UserGrpcClient: any = {
  name: UserProto.USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    package: UserProto.USER_PACKAGE_NAME,
    protoPath: join(__dirname, UserConfig.path),
    url: `${UserConfig.server}:${UserConfig.port}`,
    loader: UserConfig.loader,
  },
};
