import { Injectable, OnModuleInit } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RolesInitService implements OnModuleInit {
  constructor(private readonly em: EntityManager) {}

  async onModuleInit() {
    await this.initSystemRoles();
  }

  async initSystemRoles(): Promise<void> {
    const fork = this.em.fork();

    let adminRole = await fork.findOne(Role, { name: 'admin' });
    if (!adminRole) {
      adminRole = fork.create(Role, {
        name: 'admin',
        description: 'Administrator role with all permissions',
        isDefault: false,
      });
      await fork.persistAndFlush(adminRole);
    }

    let userRole = await fork.findOne(Role, { name: 'user' });
    if (!userRole) {
      userRole = fork.create(Role, {
        name: 'user',
        description: 'Standard user',
        isDefault: true,
      });
      await fork.persistAndFlush(userRole);
    }

    const allPermissions = await fork.find(Permission, {});
    adminRole.permissions.set(allPermissions);

    await fork.persistAndFlush(adminRole);
    await fork.persistAndFlush(userRole);
  }
}
