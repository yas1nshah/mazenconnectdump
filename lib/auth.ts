import { db } from "@/drizzle/db";
import { Campus as userTable, sessionTable } from "@/drizzle/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";


const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable )


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes:{
            secure: process.env.NODE_ENV === "production",
        }
    },
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email
		};
	}
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}


interface DatabaseUserAttributes {
	email: string;
}