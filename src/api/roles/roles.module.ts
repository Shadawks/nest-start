import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from '../users/users.module';
import { RbacModule } from '../../rbac/rbac.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Role]),
    UsersModule,
    RbacModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})

export class RolesModule {}
