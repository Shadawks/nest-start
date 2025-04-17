import { 
  Controller, Get, Post, Body, Put, Delete, Param, UseGuards
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleSchema, CreateRoleDto, UpdateRoleDto } from './role.schema';
import { ZodValidationPipe } from '../../common/pipes/zod.pipe';

import { AuthGuard } from '../../rbac/guards/auth.guard';
import { RoleGuard } from '../../rbac/guards/role.guard';
import { PermissionGuard } from '../../rbac/guards/permission.guard';
import { RequireRoles } from '../../rbac/decorators/require-roles.decorator';
import { RequirePermissions } from '../../rbac/decorators/require-permissions.decorator';

@Controller('roles')
@UseGuards(AuthGuard, RoleGuard, PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @RequireRoles('admin')
  @RequirePermissions('roles:list')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RequireRoles('admin')
  @RequirePermissions('roles:view')
  async findOne(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Post()
  @RequireRoles('admin')
  @RequirePermissions('roles:create')
  async create(@Body(new ZodValidationPipe(CreateRoleSchema)) dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Put(':id')
  @RequireRoles('admin')
  @RequirePermissions('roles:update')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @RequireRoles('admin')
  @RequirePermissions('roles:delete')
  async remove(@Param('id') id: string) {
    await this.rolesService.remove(id);
    return { message: 'Role deleted successfully' };
  }

  @Post('users/:userId/roles/:roleId')
  @RequireRoles('admin')
  @RequirePermissions('roles:assign')
  async assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ) {
    await this.rolesService.assignRoleToUser(userId, roleId);
    return { message: 'Role assigned successfully' };
  }

  @Delete('users/:userId/roles/:roleId')
  @RequireRoles('admin')
  @RequirePermissions('roles:remove')
  async removeRoleFromUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ) {
    await this.rolesService.removeRoleFromUser(userId, roleId);
    return { message: 'Role removed successfully' };
  }

  @Post(':id/permissions')
  @RequireRoles('admin')
  @RequirePermissions('permissions:assign')
  async assignPermissions(
    @Param('id') id: string,
    @Body() body: { permissionIds: string[] }
  ) {
    return this.rolesService.assignPermissionsToRole(id, body.permissionIds);
  }

  @Delete(':id/permissions/:permissionId')
  @RequireRoles('admin')
  @RequirePermissions('permissions:remove')
  async removePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string
  ) {
    return this.rolesService.removePermissionFromRole(id, permissionId);
  }

  @Get(':id/permissions')
  @RequireRoles('admin')
  @RequirePermissions('roles:view')
  async getRoleWithPermissions(@Param('id') id: string) {
    return this.rolesService.getRoleWithPermissions(id);
  }
  
}
