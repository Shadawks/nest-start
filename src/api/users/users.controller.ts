import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSchema, CreateUserDto } from './user.schema';
import { ZodValidationPipe } from '../../common/pipes/zod.pipe'

import { AuthGuard } from '../../rbac/guards/auth.guard';
import { RoleGuard } from '../../rbac/guards/role.guard';
import { PermissionGuard } from '../../rbac/guards/permission.guard';
import { RequireRoles } from '../../rbac/decorators/require-roles.decorator';
import { RequirePermissions } from '../../rbac/decorators/require-permissions.decorator';


@Controller('users')
@UseGuards(AuthGuard, RoleGuard, PermissionGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequireRoles('admin')
  @RequirePermissions('users:create')
  create(@Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @RequireRoles('admin')
  @RequirePermissions('users:list')
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
  ) {
    return this.usersService.findAll(page, pageSize);
  }

  @Get('username/:username')
  @RequireRoles('admin')
  @RequirePermissions('users:view')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get('email/:email')
  @RequireRoles('admin')
  @RequirePermissions('users:view')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  @RequireRoles('admin')
  @RequirePermissions('users:view')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @RequireRoles('admin')
  @RequirePermissions('users:update')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(CreateUserSchema.partial()))
    dto: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @RequireRoles('admin')
  @RequirePermissions('delete:user')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
