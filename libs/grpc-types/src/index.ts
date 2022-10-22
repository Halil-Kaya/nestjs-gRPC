import * as UserProto from "./protos/user";
import * as AuthProto from "./protos/auth";
import * as TodoProto from "./protos/todo";

import * as GrpcClients from "./clients";

export {
  UserProto,
  AuthProto,
  TodoProto,
  GrpcClients
};

export const GrpcMetadataErrorKey = "custom-grpc-error";