import { Entity, PrimaryKey, Property, Collection, ManyToMany } from '@mikro-orm/core';
import { User } from '../../api/users/user.entity';
import { Permission } from '../permissions/permission.entity';
import { v4 } from 'uuid';

@Entity()
export class Role {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @Property()
  description?: string;

  @Property({ nullable: true, default: false })
  isDefault?: boolean = false;

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToMany(() => User, user => user.roles)
  users = new Collection<User>(this);

  @ManyToMany(() => Permission, permission => permission.roles, { owner: true })
  permissions = new Collection<Permission>(this);
}