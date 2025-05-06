import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { RbacModule } from '../../rbac/rbac.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Permission]), 
    UsersModule, 
    RolesModule,
    RbacModule
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
