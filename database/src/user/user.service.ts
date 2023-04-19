import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Tags } from './entities/tags.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tag: Repository<Tags>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('打印***createUserDto', createUserDto);
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return await this.user.save(data);
  }

  //通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
  // 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
  // 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新
  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({ where: { id: params.userId } });
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags();
      T.tags = params.tags[i];
      await this.tag.save(T);
      tagList.push(T);
    }
    userInfo.tags = tagList;
    console.log(userInfo, 1);
    return this.user.save(userInfo);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      //查询的时候如果需要联合查询需要增加 relations
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`% ${query.keyWord} %`),
      },
    });
    return {
      data,
      total,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
