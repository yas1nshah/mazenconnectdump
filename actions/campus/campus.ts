"use server"
import { db } from "@/drizzle/db";
import { Campus, City } from "@/drizzle/schema";
import { lucia } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { error } from "console";
import { validateRequest } from "@/lib/validateSession";


const campusSchema = z.object({
    name: z.string().min(3, 'Campus name is required').max(50, 'Campus name is too long'),
    city: z.number().min(1, 'City is required').max(10, 'Choose a valid city'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(50, 'Password is too long'),
    email: z.string().email('Invalid email').min(1, 'Email is required').max(100, 'Email is too long'),
});

const campusLoginSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required').max(100, 'Email is too long'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(50, 'Password is too long'),
});


export const createCampus = async (formData: z.infer<typeof campusSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }

   const validationResult = campusSchema.safeParse(formData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    console.log(formData.password)
    const passHash = await bcrypt.hash(formData.password, 10);
    console.log(formData.password)

    // const passHash = await Bun.password.hash(formData.password, {
    //     algorithm: "bcrypt",
    //     cost: 4,
    // });


    
    const userId = generateIdFromEntropySize(10);

    try {

        const response = await db.select().from(Campus).where(eq(Campus.email, formData.email));
        if(response.length > 0) {
            return {
                errors: "Email already exists. Please try again with a different email.",
            };
        }
        
        await db.insert(Campus).values({
            id: userId,
            name: validationResult.data.name,
            email: validationResult.data.email,
            city: validationResult.data.city,
            password: passHash,
        });

        console.log("craeted")
        return{
            success: true
        }

        // const session = await lucia.createSession(userId, {email: formData.email});
        // const sessionCookie = lucia.createSessionCookie(session.id);
        // cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        // return redirect("/");
    } catch (error) {
        return {
            errors: "Failed to create Campus. Please try again later.",
        };
    }
}


// export const getCampuses = async () => {
//     time.sleep(2)
//     const campuses = await db.select().from(Campus);
//     return campuses;
// }

export const loginCampus = async (formData: z.infer<typeof campusLoginSchema>) => {
    const validationResult = campusLoginSchema.safeParse(formData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors.email?.[0] || "Validation failed.",
        };
    }

    const existingCampus = await db.select().from(Campus).where(eq(Campus.email, formData.email)).limit(1);
    if(!existingCampus){
        return {
            error: "Email not found."
        }
    }

    const validPassword = await bcrypt.compare(formData.password, existingCampus[0].password);
    if (!validPassword) {
        return {
            error: "Invalid password."
        }
    }

    const session = await lucia.createSession(existingCampus[0].id, {email: formData.email});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect("/");

}

export const getCampuses = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const campuses = await db
        .select({
            id: Campus.fkid,
            name: Campus.name,
            email: Campus.email,
            city: City.name,
            is_superuser: Campus.is_superuser
        })
        .from(Campus)
        .leftJoin(City,eq(Campus.city, City.id))
    return campuses;
}

export const deleteCampus = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.delete(Campus).where(eq(Campus.fkid, id));
}
