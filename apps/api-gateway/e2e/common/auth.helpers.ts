import axios from "axios";
import { base_uri } from "./index";
import { AuthProto } from "grpc-types/grpc-types";

const uri = base_uri + "auth/";

export const login = (dto: AuthProto.LoginDto) => {
  return axios.post(uri + "login", dto);
};