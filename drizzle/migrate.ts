import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './db';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';


const makeMigration = async () => {
    try {
        const client = await mysql.createConnection(process.env.DATABASE_URL as string)

        const dbMigrator = drizzle(client)

        await migrate(dbMigrator, {
            migrationsFolder: './drizzle/migrations' 
        })

        console.log("DB migrated")
        
        client.end()
        process.exit(0)
        
    } catch (error) {
        console.log("migration error: ", error) 
        process.exit(0)
    }
}

makeMigration()

