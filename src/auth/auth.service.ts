import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException
} from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import { CreateUserDto } from '../api/users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../api/users/user.entity';
import AuthResponse from '../common/interfaces/AuthResponse';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUsername, existingEmail] = await Promise.all([
      this.usersService.findByUsername(userData.username),
      this.usersService.findByEmail(userData.email)
    ]);
    
    if (existingUsername || existingEmail) {
      throw new ConflictException('Username or email already exists');
    }

    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return this.generateAuthResponse(user);
  }

  async login(identifier: string, password: string): Promise<AuthResponse> {
    const user = await this.usersService.findByUsernameOrEmail(identifier);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isBlocked) {
      throw new UnauthorizedException('User is blocked');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateAuthResponse(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const tokenEntity = await this.refreshTokenService.findByToken(refreshToken);
    
    if (!tokenEntity) {
      throw new ForbiddenException('Invalid refresh token');
    }
    
    if (new Date() > tokenEntity.expiresAt) {
      await this.refreshTokenService.revokeToken(tokenEntity.id);
      throw new ForbiddenException('Refresh token expired');
    }
    
    const user = tokenEntity.user;
    
    if (user.isBlocked) {
      throw new UnauthorizedException('User is blocked');
    }

    await this.refreshTokenService.revokeToken(tokenEntity.id);
    
    return this.generateAuthResponse(user);
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    const token = await this.jwtService.signAsync({
      sub: user.id
    });
    
    const refreshTokenEntity = await this.refreshTokenService.createRefreshToken(user);
    
    return {
      token,
      refreshToken: refreshTokenEntity.token,
      user,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.refreshTokenService.revokeAllUserTokens(userId);
  }
}