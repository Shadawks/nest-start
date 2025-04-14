import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException
} from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import { CreateUserDto } from '../api/users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../api/users/user.entity';
import AuthResponse from '../common/interfaces/AuthResponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    
    const existingUsername = await this.usersService.findByUsername(
      userData.username,
    );
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
      isAdmin: false,
      isBlocked: false,
      isVerified: false,
    });

    return this.generateAuthResponse(user);
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const user = await this.usersService.findByUsername(username);
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

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    const { password: _hashed, ...userWithoutPassword } = user;
    const token = await this.jwtService.signAsync(userWithoutPassword);

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
