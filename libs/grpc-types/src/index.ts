import * as UserProto from "./protos/user";
import * as AuthProto from "./protos/auth";
import * as GrpcClients from "./clients";

export {
  UserProto,
  AuthProto,
  GrpcClients
};

export const GrpcMetadataErrorKey = "custom-grpc-error";