import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createCode(@Body() body, @Req() req) {
    console.log('打印***body createCode', body.code, req.session.code);
    if (
      body?.code?.toLocaleLowerCase() === req.session.code.toLocaleLowerCase()
    ) {
      return {
        code: 1,
        message: '验证成功',
      };
    } else {
      return {
        code: 0,
        message: '验证失败',
      };
    }
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    console.log('打印***req,res', req.session, res.type);
    //每次重新请求，会生成新的验证码
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
