import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { User } from '../api/users/user.entity';
import { v4 } from 'uuid';

@Entity()
export class RefreshToken {
  @PrimaryKey()
  id: string = v4();

  @Index()
  @Property()
  token!: string;

  @Property()
  expiresAt!: Date;

  @Property()
  createdAt: Date = new Date();

  @Index()
  @ManyToOne(() => User)
  user!: User;

  @Index()
  @Property()
  isRevoked: boolean = false;
}