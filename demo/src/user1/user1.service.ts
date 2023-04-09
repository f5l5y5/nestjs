import { Injectable } from '@nestjs/common';
import { CreateUser1Dto } from './dto/create-user1.dto';
import { UpdateUser1Dto } from './dto/update-user1.dto';

@Injectable()
export class User1Service {
  create(createUser1Dto: CreateUser1Dto) {
    return 'This action adds a new user1';
  }

  findAll() {
    return `This action returns all user1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user1`;
  }

  update(id: number, updateUser1Dto: UpdateUser1Dto) {
    return `This action updates a #${id} user1`;
  }

  remove(id: number) {
    return `This action removes a #${id} user1`;
  }
}
