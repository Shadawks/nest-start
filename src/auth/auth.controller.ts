import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../api/users/users.service';
import { ZodValidationPipe } from '../common/pipes/zod.pipe';
import {
  LoginDto,
  LoginSchema,
  RegisterDto,
  RegisterSchema,
} from './auth.schema';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import JwtPayload from '../common/interfaces/JwtPayload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(RegisterSchema)) dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.id);
  }
}
