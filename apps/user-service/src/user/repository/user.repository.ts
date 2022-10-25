import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../model/user";
import { Model } from "mongoose";
import { UserProto } from "grpc-types/grpc-types";
import { IUser } from "interfaces/interfaces/IUser";

@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async create(dto: UserProto.CreateDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  async getUserByNickname(nickname: string, select: string[] = []) {
    return this.userModel.findOne({ nickname }).select(select);
  }

  async isNicknameTaken(nickname: string): Promise<boolean> {
    const count = await this.userModel.count({
      nickname
    });
    return count > 0;
  }

  async findById(_id: string): Promise<IUser> {
    return this.userModel.findById(_id);
  }
}