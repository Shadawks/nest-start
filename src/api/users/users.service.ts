import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.schema';
import PaginatedResult from '../../common/interfaces/PaginatedResult';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.em.create(User, dto);
    await this.em.persistAndFlush(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.em.findOne(User, { id }, { populate: ['roles'] });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.em.findOne(User, { email }, { populate: ['roles'] });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.em.findOne(User, { username }, { populate: ['roles'] });

    return user;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const user = await this.em.findOne(User, {
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    }, { populate: ['roles'] });

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    this.em.assign(user, dto);
    await this.em.persistAndFlush(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.em.removeAndFlush(user);
  }

  async findAll(page = 1, pageSize = 10): Promise<PaginatedResult<User>> {
    const [data, total] = await this.em.findAndCount(User, {}, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      populate: ['roles'],
    });

    return {
      data,
      total,
      page,
      pageSize,
      pageCount: Math.ceil(total / pageSize)
    };
  }

  async findAllSimple(): Promise<User[]> {
    return this.em.find(User, {}, { populate: ['roles'] });
  }
}
