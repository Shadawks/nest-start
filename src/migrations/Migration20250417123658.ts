import { Migration } from '@mikro-orm/migrations';

export class Migration20250417123658 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`permission\` (\`id\` text not null, \`name\` text not null, \`description\` text not null, \`category\` text not null, \`created_at\` datetime null, \`updated_at\` datetime null, primary key (\`id\`));`);
    this.addSql(`create unique index \`permission_name_unique\` on \`permission\` (\`name\`);`);

    this.addSql(`create table \`role\` (\`id\` text not null, \`name\` text not null, \`description\` text not null, \`is_default\` integer null default false, \`created_at\` datetime null, \`updated_at\` datetime null, primary key (\`id\`));`);
    this.addSql(`create unique index \`role_name_unique\` on \`role\` (\`name\`);`);

    this.addSql(`create table \`role_permissions\` (\`role_id\` text not null, \`permission_id\` text not null, constraint \`role_permissions_role_id_foreign\` foreign key(\`role_id\`) references \`role\`(\`id\`) on delete cascade on update cascade, constraint \`role_permissions_permission_id_foreign\` foreign key(\`permission_id\`) references \`permission\`(\`id\`) on delete cascade on update cascade, primary key (\`role_id\`, \`permission_id\`));`);
    this.addSql(`create index \`role_permissions_role_id_index\` on \`role_permissions\` (\`role_id\`);`);
    this.addSql(`create index \`role_permissions_permission_id_index\` on \`role_permissions\` (\`permission_id\`);`);

    this.addSql(`create table \`user\` (\`id\` text not null, \`username\` text not null, \`email\` text not null, \`password\` text not null, \`language\` text not null, \`theme\` text not null, \`is_verified\` integer not null default false, \`is_blocked\` integer not null default false, \`created_at\` datetime null default CURRENT_TIMESTAMP, \`updated_at\` datetime null default CURRENT_TIMESTAMP, primary key (\`id\`));`);
    this.addSql(`create unique index \`user_username_unique\` on \`user\` (\`username\`);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);
    this.addSql(`create index \`user_is_verified_index\` on \`user\` (\`is_verified\`);`);
    this.addSql(`create index \`user_is_blocked_index\` on \`user\` (\`is_blocked\`);`);

    this.addSql(`create table \`refresh_token\` (\`id\` text not null, \`token\` text not null, \`expires_at\` datetime not null, \`created_at\` datetime not null, \`user_id\` text not null, \`is_revoked\` integer not null default false, constraint \`refresh_token_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`refresh_token_token_index\` on \`refresh_token\` (\`token\`);`);
    this.addSql(`create index \`refresh_token_user_id_index\` on \`refresh_token\` (\`user_id\`);`);
    this.addSql(`create index \`refresh_token_is_revoked_index\` on \`refresh_token\` (\`is_revoked\`);`);

    this.addSql(`create table \`user_roles\` (\`user_id\` text not null, \`role_id\` text not null, constraint \`user_roles_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete cascade on update cascade, constraint \`user_roles_role_id_foreign\` foreign key(\`role_id\`) references \`role\`(\`id\`) on delete cascade on update cascade, primary key (\`user_id\`, \`role_id\`));`);
    this.addSql(`create index \`user_roles_user_id_index\` on \`user_roles\` (\`user_id\`);`);
    this.addSql(`create index \`user_roles_role_id_index\` on \`user_roles\` (\`role_id\`);`);
  }

}
