import axios, { AxiosResponse } from 'axios';
import { base_uri } from './index';
import { AuthProto } from 'grpc-types/grpc-types';
import { Response } from 'interceptors/interceptors';

const uri = base_uri + 'auth/';

export const login = (
  dto: AuthProto.LoginDto,
): Promise<AxiosResponse<Response<AuthProto.LoginAck>>> => {
  return axios.post(uri + 'login', dto);
};
