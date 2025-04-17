import { Entity, PrimaryKey, Property, Collection, ManyToMany } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Role } from '../roles/role.entity';

@Entity()
export class Permission {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  name!: string;

  @Property()
  description?: string;

  @Property()
  category!: string;

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @ManyToMany(() => Role, role => role.permissions)
  roles = new Collection<Role>(this);
}
