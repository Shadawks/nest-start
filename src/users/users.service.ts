import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.em.create(User, dto);

    await this.em.persistAndFlush(user);

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.em.findOne(User, { id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.em.findOne(User, { username });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.findById(id);

    if (!user) return null;

    this.em.assign(user, dto);
    await this.em.persistAndFlush(user);

    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);

    if (!user) return;

    await this.em.removeAndFlush(user);
  }

  async findAll(): Promise<User[]> {
    return this.em.find(User, {});
  }
}
