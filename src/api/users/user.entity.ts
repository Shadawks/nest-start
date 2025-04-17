import { Entity, PrimaryKey, Property, Index, Unique, ManyToMany, Collection } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

  @Unique()
  @Property()
  username!: string;

  @Unique()
  @Property()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  language!: string;

  @Property()
  theme!: string;

  @Index()
  @Property({ default: false })
  isVerified?: boolean = false;

  @Index()
  @Property({ default: false })
  isBlocked?: boolean = false;

  @Property({ nullable: true, defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date(), defaultRaw: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date = new Date();

  @ManyToMany(() => Role, role => role.users, { owner: true })
  roles = new Collection<Role>(this);
}
