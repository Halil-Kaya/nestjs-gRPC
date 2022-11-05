import * as UserProto from './protos/user';
import * as AuthProto from './protos/auth';
import * as TodoProto from './protos/todo';

import * as GrpcServers from './servers';
import * as GrpcClients from './clients';

export { UserProto, AuthProto, TodoProto, GrpcServers, GrpcClients };

export const GrpcMetadataErrorKey = 'custom-grpc-error';
