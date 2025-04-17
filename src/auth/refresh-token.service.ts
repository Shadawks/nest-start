import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../api/users/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly em: EntityManager) {}

  async createRefreshToken(user: User, expiresIn: number = 604800): Promise<RefreshToken> {
    const token = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    await this.revokeAllUserTokens(user.id);

    const refreshToken = this.em.create(RefreshToken, {
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
    return this.em.findOne(RefreshToken, { token, isRevoked: false }, { populate: ['user'] });
  }

  async revokeToken(id: string): Promise<void> {
    const token = await this.em.findOne(RefreshToken, id);
    if (token) {
      token.isRevoked = true;
      await this.em.flush();
    }
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const tokens = await this.em.find(RefreshToken, { user: userId, isRevoked: false });
    
    tokens.forEach(token => {
      token.isRevoked = true;
    });
    
    await this.em.flush();
  }
}
