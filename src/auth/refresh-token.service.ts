import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../api/users/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: EntityRepository<RefreshToken>,
    private readonly em: EntityManager
  ) {}

  async createRefreshToken(user: User, expiresIn: number = 604800): Promise<RefreshToken> {
    const token = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    await this.revokeAllUserTokens(user.id);

    const refreshToken = this.refreshTokenRepository.create({
      token,
      expiresAt,
      user,
      createdAt: new Date(),
      isRevoked: false
    });

    await this.em.persistAndFlush(refreshToken);
    return refreshToken;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne(
      { token, isRevoked: false },
      { populate: ['user'] }
    );
  }

  async revokeToken(id: string): Promise<void> {
    const token = await this.refreshTokenRepository.findOne(id);
    if (token) {
      token.isRevoked = true;
      await this.em.flush();
    }
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const tokens = await this.refreshTokenRepository.find({ 
      user: { id: userId },
      isRevoked: false 
    });
    
    tokens.forEach(token => {
      token.isRevoked = true;
    });
    
    await this.em.flush();
  }
}
