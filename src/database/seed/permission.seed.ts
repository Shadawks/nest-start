import { EntityManager } from '@mikro-orm/core';
import { Permission } from '../../api/permissions/permission.entity';

export async function seedPermissions(em: EntityManager): Promise<void> {
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

  const existing = await em.find(Permission, {});
  const existingNames = new Set(existing.map(p => p.name));

  for (const data of defaultPermissions) {
    if (!existingNames.has(data.name)) {
      em.persist(em.create(Permission, data));
    }
  }

  await em.flush();
}
