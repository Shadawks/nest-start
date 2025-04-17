import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RoleGuard } from './guards/role.guard';
import { PermissionGuard } from './guards/permission.guard';

@Module({
  providers: [RbacService, RoleGuard, PermissionGuard],
  exports: [RbacService, RoleGuard, PermissionGuard],
})

export class RbacModule {}
