"use server"

import { db } from "@/drizzle/db"
import { Campus, Class, ClassSection } from "@/drizzle/schema";
import { validateRequest } from "@/lib/validateSession";
import { and, eq } from "drizzle-orm";
import { Section } from "lucide-react";
import { z } from "zod";

const sectionSchema = z.object({
    name: z.string().min(1, 'Section name is required').max(100, 'Section name is too long'),
    class: z.number().min(1, 'Class is required').max(10, 'Choose a valid Class'),
});


export const createSection = async (formData: z.infer<typeof sectionSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a class."
        }
    }
    // Validate input using the schema
    const validationResult = sectionSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    
    try {
        const campus = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
        await db.insert(ClassSection).values({
            name: validationResult.data.name,
            class: validationResult.data.class,
        });

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create class. Please try again later.",
        };
    }
}

export const getSections = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const campus = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
    const classes = await db.select().from(Class).where(eq(Class.campus, campus[0].fkid));
    return classes;
}

export const getSectionsByClass = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    const sections = await db.select().from(ClassSection).where(and(eq(ClassSection.class, id), eq(ClassSection.class, id)));
    return sections;
}