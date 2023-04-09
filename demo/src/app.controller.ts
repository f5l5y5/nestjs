import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/** 此处与路由进行通信 此处添加的是公共的路径 /get/hello /get/666 */
@Controller('get')
export class AppController {
  constructor(private readonly appService: AppService) {}
  /** 相当于AppService 需要注入进来， 直接去调用上面的方法 */
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('666')
  get666(): string {
    return this.appService.get666();
  }
}
