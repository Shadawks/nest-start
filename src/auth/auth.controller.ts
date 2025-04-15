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
import { ZodValidationPipe } from '../common/pipes/zod.pipe';
import {
  LoginDto,
  LoginSchema,
  RegisterDto,
  RegisterSchema,
} from './auth.schema';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { User } from '../api/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  getProfile(@CurrentUser() user: User) {
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
