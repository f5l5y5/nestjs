import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import type { Request } from 'express';

export const Role = (...args: string[]) => SetMetadata('role', args);

type MyParamOptions = {
  role?: string; // 是否必传参数，默认为 true
  defaultValue?: number; // 默认值
};

export const MyParam = createParamDecorator(
  (options: MyParamOptions, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    console.log('打印***options', options);
    return request.url;
  },
);
