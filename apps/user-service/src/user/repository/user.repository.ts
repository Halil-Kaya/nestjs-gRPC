import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument, UserRole } from "../model/user";
import { ClientSession, Model } from "mongoose";
import { UserProto } from "grpc-types/grpc-types";
import { enumAdapterHelper } from "core/core";

@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async create(dto: UserProto.UserCreateDto, session?: ClientSession): Promise<User> {
    const user = new this.userModel({
      ...dto,
      role: enumAdapterHelper(dto.role, UserProto.UserRole, UserRole)
    });
    return user.save({ session });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).lean().exec();
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userModel.findOne({ nickname }).lean().exec();
  }

  async isNicknameTaken(nickname: string): Promise<boolean> {
    const count = await this.userModel.count({
      nickname
    });
    return count > 0;
  }
}