import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { ClientSession } from "mongoose";
import { User } from "../model/user";
import { UserProto } from "grpc-types/grpc-types";
import { NicknameAlreadyTakenExceptions } from "exceptions/exceptions";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async create(dto: UserProto.UserCreateDto, session?: ClientSession): Promise<UserProto.UserCreateAck> {
    const isNicknameTaken = await this.userRepository.isNicknameTaken(dto.nickname);
    if (isNicknameTaken) {
      throw new NicknameAlreadyTakenExceptions();
    }
    return this.userRepository.create(dto, session);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userRepository.findByNickname(nickname);
  }

}