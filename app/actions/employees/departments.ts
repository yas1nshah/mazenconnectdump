"use server"
import { db } from "@/drizzle/db"
import { City, Department, Designation } from "@/drizzle/schema"
import { validateRequest } from "@/lib/validateSession";
import { eq } from "drizzle-orm";
import {z} from "zod"

 const deprtmentSchema = z.object({
    name: z.string().min(1, 'City name is required').max(10, 'City name is too long'),
  });

export default async function createDepartment(formData: z.infer<typeof deprtmentSchema>) {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    // Validate input using the schema
    const validationResult = deprtmentSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        // Insert the new city into the database
        await db.insert(Department).values({
            name: validationResult.data.name,
        });
        return { success: true }; // Optionally return a success response

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create Department. Please try again later.",
        };
    }
}

export const getDepartments = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const departments = await db.select().from(Department);
    return departments;
}


export const getDepartmentsWithDesignations = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    const result = await db
        .select({
            department: Department,
            designation: Designation, 
        })
        .from(Department)
        .leftJoin(Designation, eq(Designation.department, Department.id)); 


    const departments = await db.select().from(Department);
    const designations = await db.select().from(Designation);
    return departments.map(department => {
        const designation = designations.find(designation => designation.department === department.id);
        return {
            ...department,
            designation: designation?.name
        }
    });
}

export const deleteDepartment = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.delete(Department).where(eq(Department.id, id));
}   