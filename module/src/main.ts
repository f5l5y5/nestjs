import { NestFactory } from '@nestjs/core';
import { NextFunction, Response, Request } from 'express';
import { AppModule } from './app.module';
import * as cors from 'cors';

const whiteList = ['/user'];

function middlewareWhole(req: Request, res: Response, next: NextFunction) {
  console.log('打印***req.originalUrl', req.originalUrl);
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    console.log('全局拦截');
    res.send({
      code: 1,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(middlewareWhole); // 不需要调用
  await app.listen(3000);
}
bootstrap();
