"use server"
import { db } from "@/drizzle/db"
import { Campus, Department, Designation, Staff, StaffStatus } from "@/drizzle/schema"
import { validateRequest } from "@/lib/validateSession";
import { and, eq } from "drizzle-orm";
import {z} from "zod"

 const employeeSchema = z.object({
    name: z.string().min(1, 'Employee name is required').max(100, 'Employee name is too long'),
    designation: z.number().min(1, 'Designation is required').max(10, 'Choose a valid Designation'),
    salary: z.number().min(1, 'Salary is required').max(1000000, 'This Salary is too high'),
    status: z.number().min(1, 'Status is Required').max(10, 'Choose a valid Status'),
});


export const createEmployee = async (formData: z.infer<typeof employeeSchema>) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    // Validate input using the schema
    const validationResult = employeeSchema.safeParse(formData);

    // Check if validation failed
    if (!validationResult.success) {
        // Return the first validation error message
        return {
            errors: validationResult.error.flatten().fieldErrors.name?.[0] || "Validation failed.",
        };
    }

    
    try {

        const campusRecord = await db
        .select()
        .from(Campus)
        .where(eq(Campus.id, session.user.id));


        await db.insert(Staff).values({
        name: validationResult.data.name,
        campus: campusRecord[0].fkid, 
        designation: validationResult.data.designation,
        is_active: true,
        status: 1,
        salary: validationResult.data.salary,
        });

        return { success: true }; 

    } catch (error) {
        // Return the first error message from the general errors
        return {
            errors: "Failed to create Employee. Please try again later.",
        };
    }
}

export const getEmployees = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const employees = await db.select().from(Staff);
    return employees;
}

export const getEmployeesByDepartment = async (id: number, campus?: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    if (campus) {
        const employees = await db.select({
        id: Staff.id,
        name: Staff.name,
        designation: Designation.name,
        salary: Staff.salary,
        dateJoined: Staff.dateJoined,
        status: StaffStatus.name,
        }).from(Staff).leftJoin(StaffStatus, eq(StaffStatus.id, Staff.status)).rightJoin(Designation, eq(Staff.designation, Designation.id)).rightJoin(Department, eq(Department.id, Designation.department)).where(and(eq(Staff.campus, campus), eq(Department.id, id)));
        
        return employees;
    }

    const campusId = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
    const employees = await db.select({
        id: Staff.id,
        name: Staff.name,
        designation: Designation.name,
        salary: Staff.salary,
        dateJoined: Staff.dateJoined,
        status: StaffStatus.name,
    }).from(Staff).leftJoin(StaffStatus, eq(StaffStatus.id, Staff.status)).rightJoin(Designation, eq(Staff.designation, Designation.id)).rightJoin(Department, eq(Department.id, Designation.department)).where(and(eq(Staff.campus, campusId[0].fkid), eq(Department.id, id)));

    return employees;
}

export const deleteEmployee = async (id: number) => {
    const session = await validateRequest();
    if (!session.user) {
        return {
            errors: "You must be logged in to create a campus."
        }
    }
    await db.delete(Staff).where(eq(Staff.id, id));
}

export const getEmployeesStatus = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }
    const status = await db.select().from(StaffStatus);
    return status;
}