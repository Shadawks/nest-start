import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  language!: string;

  @Property()
  theme!: string;

  @Property({ default: false })
  isVerified: boolean = false;

  @Property({ default: false })
  isAdmin: boolean = false;

  @Property({ default: false })
  isBlocked: boolean = false;
}
