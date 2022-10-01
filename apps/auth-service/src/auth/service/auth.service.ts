import { Injectable } from "@nestjs/common";
import { AuthProto } from "grpc-types/grpc-types";

@Injectable()
export class AuthService {
  constructor() {
  }

  login(dto: AuthProto.LoginDto): AuthProto.LoginAck {
    return {
      token: "sadasdasd"
    };
  }

}