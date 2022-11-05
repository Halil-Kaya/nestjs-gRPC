import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";

@Module({
  imports: [MongooseModule.forRoot("mongodb://mongo:27017"), UserModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
