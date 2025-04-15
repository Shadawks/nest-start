import { Migration } from '@mikro-orm/migrations';

export class Migration20250415130221 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` text not null, \`username\` text not null, \`email\` text not null, \`password\` text not null, \`language\` text not null, \`theme\` text not null, \`is_verified\` integer not null default false, \`is_admin\` integer not null default false, \`is_blocked\` integer not null default false, \`created_at\` datetime null default CURRENT_TIMESTAMP, \`updated_at\` datetime null default CURRENT_TIMESTAMP, primary key (\`id\`));`);
    this.addSql(`create unique index \`user_username_unique\` on \`user\` (\`username\`);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);
    this.addSql(`create index \`user_is_verified_index\` on \`user\` (\`is_verified\`);`);
    this.addSql(`create index \`user_is_admin_index\` on \`user\` (\`is_admin\`);`);
    this.addSql(`create index \`user_is_blocked_index\` on \`user\` (\`is_blocked\`);`);

    this.addSql(`create table \`refresh_token\` (\`id\` text not null, \`token\` text not null, \`expires_at\` datetime not null, \`created_at\` datetime not null, \`user_id\` text not null, \`is_revoked\` integer not null default false, constraint \`refresh_token_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`refresh_token_token_index\` on \`refresh_token\` (\`token\`);`);
    this.addSql(`create index \`refresh_token_user_id_index\` on \`refresh_token\` (\`user_id\`);`);
    this.addSql(`create index \`refresh_token_is_revoked_index\` on \`refresh_token\` (\`is_revoked\`);`);
  }

}
