import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
