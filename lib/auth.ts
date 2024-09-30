import { db } from "@/drizzle/db";
import { Campus as userTable, sessionTable } from "@/drizzle/schema";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";


const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable )


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes:{
            secure: false,
        }
    },
    getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			fkid: attributes.fkid
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
	fkid: number; 
}