import { Injectable, OnModuleInit } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { seedPermissions } from './permission.seed';
import { seedRoles } from './role.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly em: EntityManager) {}

  async onModuleInit() {
    const fork = this.em.fork();

    await seedPermissions(fork);
    await seedRoles(fork);
  }
}
