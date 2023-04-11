import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    @Inject('Config') private readonly value: object,
  ) {}

  @Get()
  getHello(): object {
    // return this.appService.getHello();
    return this.value;
  }

  @Get('user')
  getUser(): string {
    return this.userService.findAll();
  }
}
