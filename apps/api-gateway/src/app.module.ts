import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AppController } from "./app.controller";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
