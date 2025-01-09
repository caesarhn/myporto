import {drizzle} from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise';

const conn = mysql.createPool({
  host: '103.163.138.86',
  user: 'sewamo23_caesar',
  password: 'alwaysopen1',
  database: 'sewamo23_my_porto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//export const db = drizzle({connection: {uri: 'mysql://sewamo23_caesar:alwaysopen1@114.10.100.162:3306/sewamo23_my_porto'}})
export const db = drizzle({client: conn})