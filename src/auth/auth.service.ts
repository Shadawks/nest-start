import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
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

    const { password: _hashed, ...userWithoutPassword } = user;
    const token = await this.jwtService.signAsync(userWithoutPassword);

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async login(username: string, password: string) {
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

    const { password: _hashed, ...userWithoutPassword } = user;
    const token = await this.jwtService.signAsync(userWithoutPassword);

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
