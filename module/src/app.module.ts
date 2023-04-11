import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, OrderModule, ConfigModule.forRoot({ path: '/666' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
