import { Migration } from '@mikro-orm/migrations';

export class Migration20250411114013 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`email\` text not null);`);
  }

}
