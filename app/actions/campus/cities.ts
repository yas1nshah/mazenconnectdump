"use server"
import { db } from "@/drizzle/db"
import { City } from "@/drizzle/schema"
import { validateRequest } from "@/lib/validateSession";
import { eq } from "drizzle-orm";
import {z} from "zod"

 const citySchema = z.object({
    name: z.string().min(1, 'City name is required').max(10, 'City name is too long'),
  });

export default async function createCity(formData: z.infer<typeof citySchema>) {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    // Validate input using the schema
    const validationResult = citySchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    try {
        // Insert the new city into the database
        await db.insert(City).values({
            name: validationResult.data.name,
        });
        return { success: true }; // Optionally return a success response

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create city. Please try again later.",
        };
    }
}

export const getCities = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const cities = await db.select().from(City);
    return cities;
}

export const deleteCity = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.delete(City).where(eq(City.id, id));
}
