import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { hashSync } from "bcryptjs";
import { IUser } from "interfaces/interfaces/IUser";

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  id: true
})
export class User implements IUser {
  @Prop({ type: MongooseSchema.Types.ObjectId, default: Types.ObjectId })
  public _id: string;

  id: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, unique: true, required: true })
  nickname: string;

  @Prop({ type: String, select: false, required: true })
  password: string;

  @Prop({ type: Number, default: Date.now, required: false })
  createdAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ nickname: 1 });

export function preSave(next: any) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = hashSync(this.password, 12);
  next();
}
