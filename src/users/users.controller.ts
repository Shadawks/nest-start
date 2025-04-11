import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSchema, CreateUserDto } from './user.schema';
import { ZodValidationPipe } from '../pipes/zod.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(CreateUserSchema.partial()))
    dto: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
