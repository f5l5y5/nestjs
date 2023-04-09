import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'yinuo',
      rolling: true,
      name: 'yn-ssid',
      cookie: { maxAge: 9999999999 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
