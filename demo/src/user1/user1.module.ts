import { Module } from '@nestjs/common';
import { User1Service } from './user1.service';
import { User1Controller } from './user1.controller';

@Module({
  controllers: [User1Controller],
  providers: [User1Service]
})
export class User1Module {}
