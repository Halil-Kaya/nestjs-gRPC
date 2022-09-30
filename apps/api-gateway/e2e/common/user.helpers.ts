import axios from "axios";
import { base_uri } from "./index";
import { UserProto } from "grpc-types/grpc-types";

const uri = base_uri + "user/";

export const createUser = (userCreateDto: UserProto.UserCreateDto) => {
  return axios.post(uri, userCreateDto);
};