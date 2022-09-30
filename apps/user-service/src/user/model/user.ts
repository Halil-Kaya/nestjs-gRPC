import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { hashSync } from "bcryptjs";

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = "admin",
  NORMAL = "normal"
}

@Schema({
  versionKey: false,
  id: true,
  timestamps: true
})
export class User {
  id: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, unique: true, required: true })
  nickname: string;

  @Prop({ type: String, select: false, required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.NORMAL })
  role: UserRole;

  @Prop({ type: Date, required: false })
  createdAt: Date;
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
