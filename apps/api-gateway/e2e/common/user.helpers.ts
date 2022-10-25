import axios, { AxiosResponse } from "axios";
import { UserProto } from "grpc-types/grpc-types";
import { base_uri } from "./index";
import { Response } from "interceptors/interceptors";

const uri = base_uri + "user/";

export const createUser = (userCreateDto: UserProto.CreateDto): Promise<AxiosResponse<Response<UserProto.CreateAck>>> => {
  return axios.post(uri, userCreateDto);
};