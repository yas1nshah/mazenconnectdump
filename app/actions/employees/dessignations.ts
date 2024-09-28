"use server"
import { db } from "@/drizzle/db"
import { Designation } from "@/drizzle/schema"
import { validateRequest } from "@/lib/validateSession";
import { eq } from "drizzle-orm";
import {z} from "zod"

 const desigmationSchema = z.object({
    name: z.string().min(1, 'City name is required').max(10, 'City name is too long'),
    department: z.number().min(1, 'City is required').max(10, 'Choose a valid city'),
  });

  export const createDesignation = async (formData: z.infer<typeof desigmationSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    // Validate input using the schema
    const validationResult = desigmationSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        // Insert the new city into the database
        await db.insert(Designation).values({
            name: validationResult.data.name,
            department: validationResult.data.department,
        });
        return { success: true }; // Optionally return a success response

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create Designation. Please try again later.",
        };
    }
}

export const getDesignations = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const designations = await db.select().from(Designation);
    return designations;
}   

export const getDesignationsbyDepartment = async (department: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const designations = await db.select().from(Designation).where(eq(Designation.department, department));
    return designations;
}

export const deleteDesignation = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.delete(Designation).where(eq(Designation.id, id));
}

