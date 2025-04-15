import { Entity, PrimaryKey, Property} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

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
