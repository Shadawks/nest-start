import { Injectable } from '@nestjs/common';
import { User } from '../api/users/user.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class RbacService {
  constructor(private readonly em: EntityManager) {}

  async hasPermission(user: User, permissionName: string): Promise<boolean> {
    await this.em.populate(user, ['roles.permissions']);

    for (const role of user.roles.getItems()) {
      for (const permission of role.permissions.getItems()) {
        if (permission.name === permissionName) {
          return true;
        }
      }
    }

    return false;
  }

  async getUserPermissions(user: User): Promise<string[]> {
    await this.em.populate(user, ['roles.permissions']);
    
    const permissionSet = new Set<string>();
    
    for (const role of user.roles.getItems()) {
      for (const permission of role.permissions.getItems()) {
        permissionSet.add(permission.name);
      }
    }

    return Array.from(permissionSet);
  }

  async hasRole(user: User, roleName: string): Promise<boolean> {
    await this.em.populate(user, ['roles']);
    
    for (const role of user.roles.getItems()) {
      if (role.name === roleName) {
        return true;
      }
    }
    
    return false;
  }

  async hasAnyRole(user: User, roleNames: string[]): Promise<boolean> {
    await this.em.populate(user, ['roles']);
    
    for (const role of user.roles.getItems()) {
      if (roleNames.includes(role.name)) {
        return true;
      }
    }
    
    return false;
  }

  async getUserRoles(user: User): Promise<string[]> {
    await this.em.populate(user, ['roles']);
    return user.roles.getItems().map(role => role.name);
  }
}
