import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto, CreatePermissionSchema } from './permission.schema';
import { ZodValidationPipe } from '../../common/pipes/zod.pipe';

import { AuthGuard } from '../../rbac/guards/auth.guard';
import { RoleGuard } from '../../rbac/guards/role.guard';
import { PermissionGuard } from '../../rbac/guards/permission.guard';
import { RequireRoles } from '../../rbac/decorators/require-roles.decorator';
import { RequirePermissions } from '../../rbac/decorators/require-permissions.decorator';

@Controller('permissions')
@UseGuards(AuthGuard, RoleGuard, PermissionGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @RequireRoles('admin')
  @RequirePermissions('permissions:list')
  async findAll() {
    return await this.permissionsService.findAll();
  }

  @Get(':id')
  @RequireRoles('admin')
  @RequirePermissions('permissions:view')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findById(id);
  }

  @Post()
  @RequireRoles('admin')
  @RequirePermissions('permissions:create')
  async create(@Body(new ZodValidationPipe(CreatePermissionSchema)) dto: CreatePermissionDto) {
    return await this.permissionsService.create(dto);
  }

  @Put(':id')
  @RequireRoles('admin')
  @RequirePermissions('permissions:update')
  async update(@Param('id') id: string, @Body() dto: UpdatePermissionDto) {
    return await this.permissionsService.update(id, dto);
  }

  @Delete(':id')
  @RequireRoles('admin')
  @RequirePermissions('permissions:delete')
  async remove(@Param('id') id: string) {
    await this.permissionsService.remove(id);
    return { message: 'Permission deleted successfully' };
  }
}
