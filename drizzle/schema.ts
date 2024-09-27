import { sql } from "drizzle-orm"
import { AnyMySqlColumn, boolean, datetime, foreignKey, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"

// City Table
export const City = mysqlTable("city", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
})

// Campus Table
export const Campus = mysqlTable("campus", {
    id: varchar("id", { length: 255 }).unique().notNull(),
    fkid: int("fk_id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    city: int("city").notNull().references(() => City.id),
    is_superuser: boolean("is_superuser").notNull().default(false),
    password: varchar("password", { length: 255 }).notNull()
})

// Session Table
export const sessionTable = mysqlTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 })
        .notNull()
        .references(() => Campus.id),
    expiresAt: datetime("expires_at").notNull()
})

// STAFF SCHEMAS

// Department Table
export const Department = mysqlTable("department", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
})

// Designation Table
export const Designation = mysqlTable("designation", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    department: int("department").notNull().references(() => Department.id)
})

// Staff Status Table
export const StaffStatus = mysqlTable("staff_status", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
})

// Staff Table
export const Staff = mysqlTable("staff", {
    id: int("id").primaryKey().autoincrement(),
    campus: int("campus").notNull().references(() => Campus.fkid),
    name: varchar("name", { length: 255 }).notNull(),
    designation: int("designation").notNull().references(() => Designation.id),
    salary: int("salary").notNull(),
    is_active: boolean("is_active").notNull(),
    dateJoined: timestamp("date_joined").notNull().defaultNow(),
    status: int("status").notNull().references(() => StaffStatus.id) // Fixed spelling
})

// CLASS SCHEMAS

// Class Table
export const Class = mysqlTable("class", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    campus: int("campus").notNull().references(() => Campus.fkid)
})

// Class Section Table
export const ClassSection = mysqlTable("class_section", {
    id: int("id").primaryKey().autoincrement(),
    class: int("class").notNull().references(() => Class.id),
    name: varchar("name", { length: 255 }).notNull(), // Changed to varchar
})

// PRINCIPAL REPORT SCHEMAS

// Principal Report Table
export const PrincipalReport = mysqlTable("principal_report", {
    id: int("id").primaryKey().autoincrement(),
    campus: int("campus").notNull().references(() => Campus.fkid), // Fixed casing
    date: timestamp("date").notNull().defaultNow(),
    studentRemarks: varchar("student_remarks", { length: 255 }),
    staffRemarks: varchar("staff_remarks", { length: 255 }),
    ttblRemarks: varchar("ttbl_remarks", { length: 255 }),
    workLoadRemarks: varchar("work_load_remarks", { length: 255 }),
    hcsRemarks: varchar("hcs_remarks", { length: 255 }),
    feedback: varchar("feedback", { length: 255 })
})

// PRClass Table
export const PRClass = mysqlTable("pr_class", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    class: varchar("class", { length: 255 }).notNull(),
    previous: int("previous").notNull().default(0),
    left: int("left").notNull().default(0),
    new: int("new").notNull().default(0),
    transfered: int("transfered").notNull().default(0),
    promoted: int("promoted").notNull().default(0),
    total: int("total").notNull().default(0),
    boys: int("boys").notNull().default(0),
    girls: int("girls").notNull().default(0),
    sectionCount: int("section_count").notNull().default(0),
    studentPerSection: int("student_per_section").notNull().default(0),
})

// PRClassSection Table
export const PRClassSection = mysqlTable("pr_class_section", {
    id: int("id").primaryKey().autoincrement(),
    class: int("class").notNull().references(() => PRClass.id),
    section: varchar("section", { length: 255 }).notNull(),
    previous: int("previous").notNull().default(0),
    left: int("left").notNull().default(0),
    new: int("new").notNull().default(0),
    transfered: int("transfered").notNull().default(0),
    promoted: int("promoted").notNull().default(0),
    total: int("total").notNull().default(0),
    boys: int("boys").notNull().default(0),
    girls: int("girls").notNull().default(0)
})

// PRStaffDepartment Table
export const PRStaffDepartment = mysqlTable("pr_staff_department", { // Fixed spelling
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
})

// PRStaff Table
export const PRStaff = mysqlTable("pr_staff", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    department: int("department").notNull().references(() => PRStaffDepartment.id), // Fixed spelling
    designation: varchar("designation", { length: 255 }).notNull(),
    previous: int("previous").notNull().default(0),
    left: int("left").notNull().default(0),
    new: int("new").notNull().default(0),
    total: int("total").notNull().default(0)
})

// PRTtbl Table
export const PRTtbl = mysqlTable("pr_ttbl", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    name: varchar("name", { length: 255 }).notNull(),
    campusRequirement: int("campus_requirement").notNull().default(0),
    available: int("available").notNull().default(0),
    working: int("working").notNull().default(0),
    outOfOrder: int("out_of_order").notNull().default(0), // Fixed spelling
})

// PRWorkload Table
export const PRWorkload = mysqlTable("pr_workload", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    teacher: int("teacher_id").notNull().references(() => Staff.id),
    workLoad: int("work_load").notNull().default(0),
})

// PRHcd Table
export const PRHcd = mysqlTable("pr_hcd", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    remarks: varchar("remarks", { length: 255 }).notNull(),
    meetings: int("meetings").notNull().default(0),
    workLoad: int("work_load").notNull().default(0)
})

// PRActivity Table
export const PRActivity = mysqlTable("pr_activity", {
    id: int("id").primaryKey().autoincrement(),
    report: int("report").notNull().references(() => PrincipalReport.id),
    name: varchar("name", { length: 255 }).notNull(),
    date: timestamp("date").notNull().defaultNow(),
    participants: int("participants").notNull().default(0),
    remarks: varchar("remarks", { length: 255 })
})
