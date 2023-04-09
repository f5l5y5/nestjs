import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Response,
} from '@nestjs/common';
import { User1Service } from './user1.service';
import { CreateUser1Dto } from './dto/create-user1.dto';
import { UpdateUser1Dto } from './dto/update-user1.dto';

@Controller('user1')
export class User1Controller {
  constructor(private readonly user1Service: User1Service) {}

  @Post('createCode')
  createCode() {
    return {
      code: 200,
      message: '成功',
    };
  }

  @Get('getList/:id')
  @HttpCode(304)
  getList(
    @Headers('custom') headers,
    @Request() req,
    @Response() res,
    @Query('name') query,
    @Param('id') param,
  ) {
    // console.log('打印***req', req);
    console.log('打印***res', res);
    console.log('打印***headers', headers);
    console.log('打印***query', query);
    console.log('打印***param', param);
    return {
      code: 200,
    };
  }

  @Post('postList')
  postList(@Request() req, @Body() body) {
    console.log('打印***req', req);
    console.log('打印***body', body);
    return {
      code: 200,
    };
  }

  @Post()
  create(@Body() createUser1Dto: CreateUser1Dto) {
    return this.user1Service.create(createUser1Dto);
  }

  @Get()
  findAll() {
    return this.user1Service.findAll();
  }

  @Get(':id')
  @Version('2')
  findOne(@Param('id') id: string) {
    return this.user1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser1Dto: UpdateUser1Dto) {
    return this.user1Service.update(+id, updateUser1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user1Service.remove(+id);
  }
}
