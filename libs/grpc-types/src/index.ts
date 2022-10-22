import * as UserProto from "./user";
import * as AuthProto from "./auth";
import * as GrpcClients from "./clients";

export {
  UserProto,
  AuthProto,
  GrpcClients
};

export const GrpcMetadataErrorKey = "custom-grpc-error";