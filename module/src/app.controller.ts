import {
  Controller,
  Get,
  Inject,
  UseInterceptors,
  UseFilters,
  NotFoundException,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from './common/response';
import { UserService } from './user/user.service';
import { HttpFilter } from './common/filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    @Inject('Config') private readonly value: object,
  ) {}

  @Get()
  @UseInterceptors(Response)
  @UseFilters(HttpFilter)
  getHello(): object {
    // return this.appService.getHello();
    // return this.value;
    throw new NotFoundException('111');
  }

  @Get('/pipe')
  find(@Query('page', ParseUUIDPipe) page: number) {
    console.log(typeof page);

    return `传入  ${page}  类型为${typeof page}`;
  }

  @Get('user')
  getUser(): string {
    return this.userService.findAll();
  }
}
