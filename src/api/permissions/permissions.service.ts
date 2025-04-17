import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Permission } from './permission.entity';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.schema';

@Injectable()
export class PermissionsService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Permission[]> {
    return this.em.find(Permission, {}, { orderBy: { category: 'ASC', name: 'ASC' } });
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.em.findOne(Permission, { id });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findByName(name: string): Promise<Permission | null> {
    return this.em.findOne(Permission, { name });
  }

  async findByNames(names: string[]): Promise<Permission[]> {
    return this.em.find(Permission, { name: { $in: names } });
  }

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const permission = this.em.create(Permission, dto);
    await this.em.persistAndFlush(permission);
    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findById(id);
    this.em.assign(permission, dto);
    await this.em.flush();
    return permission;
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findById(id);
    await this.em.removeAndFlush(permission);
  }
}
