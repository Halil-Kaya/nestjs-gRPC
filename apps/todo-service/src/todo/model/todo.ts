import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type TodoDocument = Todo & Document;

@Schema({
  versionKey: false,
  id: true,
  timestamps: true
})
export class Todo {
  @Prop({ type: MongooseSchema.Types.ObjectId, default: Types.ObjectId })
  public _id: string;

  id: string;

  @Prop({
    type: String
  })
  title: string;

  @Prop({
    type: String
  })
  content: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.index({ nickname: 1 });