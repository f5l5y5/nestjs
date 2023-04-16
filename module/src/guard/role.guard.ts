import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('打印***context 守卫', context);
    const admin = this.reflector.get<string[]>('role', context.getHandler()); // [ 'admin' ]
    // ?role=admin 进行定义 有就访问
    const req = context.switchToHttp().getRequest<Request>();
    console.log(req.query.role);
    if (admin.includes(req.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
