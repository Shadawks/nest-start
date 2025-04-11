import { Migration } from '@mikro-orm/migrations';

export class Migration20250411115404 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add column \`password\` text not null;`);
    this.addSql(`alter table \`user\` add column \`language\` text not null;`);
    this.addSql(`alter table \`user\` add column \`theme\` text not null;`);
    this.addSql(`alter table \`user\` add column \`is_verified\` integer not null default false;`);
    this.addSql(`alter table \`user\` add column \`is_admin\` integer not null default false;`);
    this.addSql(`alter table \`user\` add column \`is_blocked\` integer not null default false;`);
    this.addSql(`alter table \`user\` rename column \`name\` to \`username\`;`);
  }

}
