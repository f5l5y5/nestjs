import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {}

  async create(createTestDto: CreateTestDto) {
    console.log('打印***createTestDto', createTestDto);
    console.log('打印***this.', this.testRepository);
    const newUser = await this.testRepository.create(createTestDto);
    return await this.testRepository.save(newUser);
  }

  async findAll() {
    return await this.testRepository.find();
  }

  async findOne(id: number) {
    return await this.testRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const updateUser = await this.testRepository.findOne({ where: { id } });
    if (!updateUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    await this.testRepository.merge(updateUser, updateTestDto);
    return await this.testRepository.save(updateUser);
  }

  async remove(id: number) {
    console.log('打印***1', 1);
    const userToRemove = await this.testRepository.findOneOrFail({
      where: { id },
    });
    if (!userToRemove) {
      throw new Error(`User with id ${id} not found.`);
    }
    return await this.testRepository.remove(userToRemove);
  }
}
