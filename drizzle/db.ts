import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import * as schema from './schema';

export const connection =  mysql.createConnection(process.env.DATABASE_URL as string);

export const db = drizzle(connection);