import { NestFactory } from '@nestjs/core';
// import { NextFunction, Response, Request } from 'express';
import { AppModule } from './app.module';
import * as cors from 'cors';
// import { Response } from './common/response';
// import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
// const whiteList = ['/user'];
// import { RoleGuard } from './guard/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// function middlewareWhole(req: Request, res: Response, next: NextFunction) {
//   console.log('打印***req.originalUrl', req.originalUrl);
//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     console.log('全局拦截');
//     res.send({
//       code: 1,
//     });
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('描述信息')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  // app.useGlobalInterceptors(new Response());
  // app.useGlobalFilters(new HttpFilter());
  // app.use(middlewareWhole); // 不需要调用
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
