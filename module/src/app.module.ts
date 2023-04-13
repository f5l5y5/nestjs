import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'images'),
      serveRoot: '/static', // 需要添加'/'
      //   serveStaticOptions: {
      //     cacheControl: true,
      //     etag: true,
      //     maxAge: 30000,
      //   },
    }),
    UserModule,
    OrderModule,
    ConfigModule.forRoot({ path: '/666' }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
