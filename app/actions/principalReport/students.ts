"use server"

import { db } from "@/drizzle/db";
import { Campus, Class, ClassSection } from "@/drizzle/schema";
import { validateRequest } from "@/lib/validateSession";
import { eq } from "drizzle-orm";

export type CampusClass = {
    id: number;
    name: string;
    campus: number;
}

export  type ClassSection = {
    id: number;
    class: number;
    name: string;
}

export type CampusClassWithSections = {
    campusClass: CampusClass;
    section: ClassSection[];
}

export const getClassesWithSections = async () => {
    const session = await validateRequest();
    if (!session.user) {
        return []
    }

    const classWithSections: CampusClassWithSections[] = [];

    const campus = await db.select().from(Campus).where(eq(Campus.id, session.user.id));
    const classes = await db.select().from(Class).where(eq(Class.campus,campus[0].fkid));

    for (const cls of classes) {
        const sections = await db.select().from(ClassSection).where(eq(ClassSection.class, cls.id));
        
        classWithSections.push({
            campusClass: cls,
            section: sections
        })
    }

    return classWithSections;
}