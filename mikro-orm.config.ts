import { defineConfig } from '@mikro-orm/sqlite';

const config = defineConfig({
  dbName: 'sqlite.db',

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  debug: true,
});

export default config;
