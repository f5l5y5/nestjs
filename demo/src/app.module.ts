import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User1Module } from './user1/user1.module';

/** 此处将收集的数据 进行提供 */
@Module({
  imports: [UserModule, User1Module],
  controllers: [AppController, UserController],
  providers: [
    UserService,
    AppService2,
    {
      provide: 'Abc',
      useClass: AppService,
    },
    {
      provide: 'Value',
      useValue: ['1', '2', '3'],
    },

    {
      provide: 'Factory',
      inject: [AppService2],
      async useFactory(appService2: AppService2) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(appService2.getHello());
          }, 2000);
        });
      },
    },
  ],
})
export class AppModule {}
