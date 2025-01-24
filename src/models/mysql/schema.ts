import { int, mysqlTable, varbinary, varchar } from 'drizzle-orm/mysql-core';

export const Account = mysqlTable('account', {
  id: varchar({length: 36}).primaryKey(),
  username: varchar({length: 128}).notNull().unique(),
  password: varchar({length: 128}).notNull(),
  creatorId: varchar('creator_id', {length: 32}).notNull()
})

export const Session = mysqlTable('session', {
  id: varchar({length: 36}).primaryKey(),
  accountId: varchar('account_id', {length: 32}).notNull().references(() => Account.id),
  sessionId: varchar('session_id', {length: 128}).notNull(),
  creatorId: varchar('creator_id', {length: 32}).notNull().references(() => creator.id),
  expired: varchar({length: 128}).notNull()
})

export const creator = mysqlTable('creator', {
  id: varchar('id', {length: 36}).primaryKey(),
  name: varchar('name', {length: 255}).notNull(),
  image: varchar('creator_img', {length: 1048}),
  link: varchar('creator_link', {length: 1048})
})

export const content = mysqlTable('content_root', {
  id: varchar('id', {length: 36}).primaryKey(),
  tittle: varchar('tittle', {length: 512}).notNull(),
  previewImg: varchar('preview_image', {length: 1048}),
  previewDesc: varchar('preview_description', {length: 1048}),
  creatorId: varchar('creator_id', {length: 32}).notNull().references(() => creator.id),
  posted: varchar('posted', {length: 32}).notNull(),
  updated: varchar('updated', {length: 32}),
  view: int('view').default(0).notNull(),
  like: int('like').default(0).notNull(),
  contentLink: varchar('content_link', {length: 1048})
})

export const contentComponent = mysqlTable('content_component', {
  id: varchar({length: 36}).primaryKey(),
  index: int().notNull(),
  content: varchar({length: 10100}),
  tag: int(),
  contentId: varchar('content_id', {length: 32}),
  style: varchar({length: 100})
})
