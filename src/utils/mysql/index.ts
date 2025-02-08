import {drizzle} from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise';

const host = import.meta.env.HOST
const user = import.meta.env.SECRET_USER
const password = import.meta.env.PASSWORD
const database = import.meta.env.DATABASE

console.log(host, user, password, database)

const conn = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//export const db = drizzle({connection: {uri: 'mysql://sewamo23_caesar:alwaysopen1@114.10.100.162:3306/sewamo23_my_porto'}})
export const db = drizzle({client: conn})