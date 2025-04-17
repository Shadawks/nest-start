import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Role } from './role.entity';
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';
import { CreateRoleDto, UpdateRoleDto } from './role.schema';

@Injectable()
export class RolesService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Role[]> {
    return this.em.find(Role, {});
  }

  async findById(id: string): Promise<Role> {
    const role = await this.em.findOne(Role, { id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return this.em.findOne(Role, { name });
  }

  async findDefaultRole(): Promise<Role | null> {
    return this.em.findOne(Role, { isDefault: true });
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.em.create(Role, dto);
    await this.em.persistAndFlush(role);
    return role;
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.findById(id);
    this.em.assign(role, dto);
    await this.em.flush();
    return role;
  }

  async remove(id: string): Promise<void> {
    const role = await this.findById(id);
    await this.em.removeAndFlush(role);
  }

  async assignRoleToUser(userId: string, roleId: string, em?: EntityManager): Promise<void> {
    const manager = em || this.em;
    const fork = manager.fork();

    const user = await fork.findOneOrFail(User, userId, { populate: ['roles'] });
    const role = await fork.findOneOrFail(Role, roleId);

    user.roles.add(role);
    await fork.flush();
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    const user = await this.em.findOneOrFail(User, userId, { populate: ['roles'] });
    const role = await this.em.findOneOrFail(Role, roleId);

    user.roles.remove(role);
    await this.em.flush();
  }

  async assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.findById(roleId);

    const permissions = await this.em.find(Permission, { id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permissions were not found');
    }

    await this.em.populate(role, ['permissions']);

    for (const permission of permissions) {
      role.permissions.add(permission);
    }

    await this.em.flush();
    return role;
  }
  
  async removePermissionFromRole(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.findById(roleId);
    const permission = await this.em.findOne(Permission, { id: permissionId });

    if (!permission) {
      throw new NotFoundException(`Permission with id ${permissionId} not found`);
    }

    await this.em.populate(role, ['permissions']);
    role.permissions.remove(permission);

    await this.em.flush();
    return role;
  }
  
  async getRoleWithPermissions(id: string): Promise<Role> {
    const role = await this.em.findOne(Role, { id }, { populate: ['permissions'] });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }
}