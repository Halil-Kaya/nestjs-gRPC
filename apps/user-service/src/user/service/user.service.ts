import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { ClientSession } from "mongoose";
import { UserProto } from "grpc-types/grpc-types";
import { NicknameAlreadyTakenException } from "exceptions/exceptions";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async create(dto: UserProto.UserCreateDto, session?: ClientSession): Promise<UserProto.UserCreateAck> {
    const isNicknameTaken = await this.userRepository.isNicknameTaken(dto.nickname);
    if (isNicknameTaken) {
      throw new NicknameAlreadyTakenException();
    }
    const createdUser = await this.userRepository.create(dto, session);
    return {
      _id: createdUser.id,
      nickname: createdUser.nickname,
      fullName: createdUser.fullName,
      createdAt: createdUser.createdAt
    };
  }

  async findById(id: string): Promise<UserProto.FindByIdAck> {
    const user = await this.userRepository.findById(id);
    return {
      user
    };
  }

  async findByNickname(nickname: string): Promise<UserProto.FindByNicknameAck> {
    const user = await this.userRepository.findByNickname(nickname);
    return {
      user
    };
  }
}