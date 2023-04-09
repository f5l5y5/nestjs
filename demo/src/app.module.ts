import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User1Module } from './user1/user1.module';

/** 此处将收集的数据 进行提供 */
@Module({
  imports: [UserModule, User1Module],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
