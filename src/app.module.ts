import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './api/roles/roles.module';
import { PermissionsModule } from './api/permissions/permissions.module';
import { RbacModule } from './rbac/rbac.module';
import config from '../mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    RbacModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
