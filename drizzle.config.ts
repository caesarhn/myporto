import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/models/mysql/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: 'mysql://sewamo23_caesar:alwaysopen1@103.163.138.86:3306/sewamo23_my_porto',
  },
});