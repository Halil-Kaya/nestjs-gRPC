import axios from "axios";
import { UserProto } from "grpc-types/grpc-types";
import { base_uri } from "./index";

const uri = base_uri + "user/";

export const createUser = (userCreateDto: UserProto.UserCreateDto) => {
  return axios.post(uri, userCreateDto);
};