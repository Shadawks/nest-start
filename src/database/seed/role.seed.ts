import { EntityManager } from '@mikro-orm/core';
import { Role } from '../../api/roles/role.entity';
import { Permission } from '../../api/permissions/permission.entity';

export async function seedRoles(em: EntityManager): Promise<void> {
  let adminRole = await em.findOne(Role, { name: 'admin' });
  if (!adminRole) {
    adminRole = em.create(Role, {
      name: 'admin',
      description: 'Administrator role with all permissions',
      isDefault: false,
    });
    em.persist(adminRole);
  }

  let userRole = await em.findOne(Role, { name: 'user' });
  if (!userRole) {
    userRole = em.create(Role, {
      name: 'user',
      description: 'Standard user',
      isDefault: true,
    });
    em.persist(userRole);
  }

  const allPermissions = await em.find(Permission, {});
  adminRole.permissions.set(allPermissions);

  await em.flush();
}
