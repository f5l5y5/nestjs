import { Injectable } from '@nestjs/common';

/** service 相当于写业务逻辑，提供数据方，需要注入到调用方 此处猜测是controller */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  get666(): string {
    return '666';
  }
}
