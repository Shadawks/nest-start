import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../api/users/user.entity';
import { v4 } from 'uuid';

@Entity()
export class RefreshToken {
  @PrimaryKey()
  id: string = v4();

  @Property()
  token!: string;

  @Property()
  expiresAt!: Date;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => User)
  user!: User;

  @Property()
  isRevoked: boolean = false;
}