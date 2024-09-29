"use server"
import { db } from "@/drizzle/db"
import { Campus, Class } from "@/drizzle/schema";
import { validateRequest } from "@/lib/validateSession";
import { eq } from "drizzle-orm";
import { z } from "zod";

const classSchema = z.object({
    name: z.string().min(1, 'Class name is required').max(100, 'Class name is too long'),
});

export const createClass = async (formData: z.infer<typeof classSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a class."
        }
    }
    // Validate input using the schema
    const validationResult = classSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    
    try {
        const campus = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
        await db.insert(Class).values({
            name: validationResult.data.name,
            campus: campus[0].fkid,
        });

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create class. Please try again later.",
        };
    }
}

export const getClasses = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const campus = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
    const classes = await db.select().from(Class).where(eq(Class.campus, campus[0].fkid));
    return classes;
}