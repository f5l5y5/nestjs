import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/** 将前端传入的值 加入到管道中 实现验证 */
@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const DTO = plainToInstance(metadata.metatype, value);
    console.log(DTO);

    const errors = await validate(DTO);
    console.log('打印***errors', errors);

    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
