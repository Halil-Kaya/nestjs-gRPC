import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UserProto } from "grpc-types/grpc-types";
import { NicknameAlreadyTakenException } from "exceptions/exceptions";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async create(dto: UserProto.CreateDto): Promise<UserProto.CreateAck> {
    const isNicknameTaken = await this.userRepository.isNicknameTaken(dto.nickname);
    if (isNicknameTaken) {
      throw new NicknameAlreadyTakenException();
    }
    const createdUser = await this.userRepository.create(dto);
    return {
      _id: createdUser.id,
      nickname: createdUser.nickname,
      fullName: createdUser.fullName,
      createdAt: createdUser.createdAt
    };
  }

  async getUserForLogin(dto: UserProto.GetUserForLoginDto): Promise<UserProto.GetUserForLoginAck> {
    const user = await this.userRepository.getUserByNickname(dto.nickname, ["+password"]);
    return {
      user
    };
  }

  async findById(dto: UserProto.FindByIdDto): Promise<UserProto.FindByIdAck> {
    const user = await this.userRepository.findById(dto._id);
    return {
      user
    };
  }

}