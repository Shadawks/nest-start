import { Injectable, OnModuleInit } from '@nestjs/common';
import { Permission } from './permission.entity';
import { EntityManager } from '@mikro-orm/core';


@Injectable()
export class PermissionsInitService implements OnModuleInit {
  constructor(private readonly em: EntityManager) {}

  async onModuleInit() {
    await this.initSystemPermissions();
  }

  async initSystemPermissions(): Promise<void> {
    const defaultPermissions = [
      { name: 'users:list', category: 'user', description: 'List all users' },
      { name: 'users:view', category: 'user', description: 'View user details' },
      { name: 'users:create', category: 'user', description: 'Create a new user' },
      { name: 'users:update', category: 'user', description: 'Update user details' },
      { name: 'users:delete', category: 'user', description: 'Delete a user' },

      { name: 'roles:list', category: 'role', description: 'List all roles' },
      { name: 'roles:view', category: 'role', description: 'View role details' },
      { name: 'roles:create', category: 'role', description: 'Create a new role' },
      { name: 'roles:update', category: 'role', description: 'Update role details' },
      { name: 'roles:delete', category: 'role', description: 'Delete a role' },
      { name: 'roles:assign', category: 'role', description: 'Assign a role to a user' },
      { name: 'roles:remove', category: 'role', description: 'Remove a role from a user' },

      { name: 'permissions:list', category: 'permission', description: 'List all permissions' },
      { name: 'permissions:view', category: 'permission', description: 'View permission details' },
      { name: 'permissions:create', category: 'permission', description: 'Create a new permission' },
      { name: 'permissions:update', category: 'permission', description: 'Update permission details' },
      { name: 'permissions:delete', category: 'permission', description: 'Delete a permission' },
      { name: 'permissions:assign', category: 'permission', description: 'Assign a permission to a role' },
      { name: 'permissions:remove', category: 'permission', description: 'Remove a permission from a role' },
    ];

    const fork = this.em.fork();
    
    for (const permData of defaultPermissions) {
      const existing = await fork.findOne(Permission, { name: permData.name });
      if (!existing) {
        const permission = fork.create(Permission, permData);
        await fork.persistAndFlush(permission);
      }
    }
  }
}