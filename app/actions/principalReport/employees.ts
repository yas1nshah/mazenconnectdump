"use server"

import { db } from "@/drizzle/db"

import { validateRequest } from "@/lib/validateSession"
import { and, count, eq } from "drizzle-orm"

type StaffCount = {
    department: {
        id: number;
        name: string;
        designation: {
            id: number;
            name: string;
            count: number;
        }[];
    }
}

// const getStaffCount = async (): Promise<StaffCount[]> => {

//     const session = await validateRequest()
//     if (!session.user) {
//         return []
//     }

//     const data = db.query.Department.findMany({
//         with: {
//             Designation: {
//                 with: {
//                     staffCount : count(Staff.id),
//                     where: eq (Staff.campus, session.user?.id)
//                 }
//             }
//         }
//     })

//     const campus = await db
//         .select()
//         .from(Campus)    
//         .where(eq(Campus.id, session.user?.id));

  
//     const staffCount: StaffCount[] = [];
//     const departments = await db.select().from(Department);

//     for (const department of departments) {
//         const designations = await db
//             .select()
//             .from(Designation)
//             .where(eq(Designation.department, department.id));

//         const designationWithCount = await Promise.all(designations.map(async (designation) => {
//             const staff = await db
//                 .select()
//                 .from(Staff)    
//                 .where(and(eq(Staff.campus ,campus[0].fkid) ,eq(Staff.designation, designation.id)));

//             return {
//                 id: designation.id,
//                 name: designation.name,
//                 count: staff.length, // Get the count of staff for the designation
//             };
//         }));

//         staffCount.push({
//             department: {
//                 id: department.id,
//                 name: department.name,
//                 designation: designationWithCount, // Use the designation with count here
//             },
//         });
//     }

//     return staffCount; // Ensure to return the complete staffCount array
// };



export const getStaff = async () => {
    const session = await validateRequest()
    if (!session.user) {
        return []
    }

    console.log(session.user)

    const campus = await db.query.Department.findMany({
       with: {
        Designation: true
       }
    }) 

    return campus

}