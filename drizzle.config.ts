import { defineConfig } from "drizzle-kit"

export default defineConfig({
 schema: "./drizzle/schema.ts",
 out: "./drizzle/migrations",
 dialect: "mysql",
 strict: true,
 dbCredentials: {
   url:process.env.DATABASE_URL as string,
 }
})