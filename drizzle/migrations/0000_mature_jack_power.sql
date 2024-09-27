CREATE TABLE `campus` (
	`id` varchar(255) NOT NULL,
	`fk_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`city` int NOT NULL,
	`is_superuser` boolean NOT NULL DEFAULT false,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `campus_fk_id` PRIMARY KEY(`fk_id`),
	CONSTRAINT `campus_id_unique` UNIQUE(`id`),
	CONSTRAINT `campus_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `city` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `city_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `class` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`campus` int NOT NULL,
	CONSTRAINT `class_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `class_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`class` int NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `class_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `department` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `department_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `designation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`department` int NOT NULL,
	CONSTRAINT `designation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`participants` int NOT NULL DEFAULT 0,
	`remarks` varchar(255),
	CONSTRAINT `pr_activity_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_class` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`class` varchar(255) NOT NULL,
	`previous` int NOT NULL DEFAULT 0,
	`left` int NOT NULL DEFAULT 0,
	`new` int NOT NULL DEFAULT 0,
	`transfered` int NOT NULL DEFAULT 0,
	`promoted` int NOT NULL DEFAULT 0,
	`total` int NOT NULL DEFAULT 0,
	`boys` int NOT NULL DEFAULT 0,
	`girls` int NOT NULL DEFAULT 0,
	`section_count` int NOT NULL DEFAULT 0,
	`student_per_section` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_class_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_class_section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`class` int NOT NULL,
	`section` varchar(255) NOT NULL,
	`previous` int NOT NULL DEFAULT 0,
	`left` int NOT NULL DEFAULT 0,
	`new` int NOT NULL DEFAULT 0,
	`transfered` int NOT NULL DEFAULT 0,
	`promoted` int NOT NULL DEFAULT 0,
	`total` int NOT NULL DEFAULT 0,
	`boys` int NOT NULL DEFAULT 0,
	`girls` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_class_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_hcd` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`remarks` varchar(255) NOT NULL,
	`meetings` int NOT NULL DEFAULT 0,
	`work_load` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_hcd_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`department` int NOT NULL,
	`designation` varchar(255) NOT NULL,
	`previous` int NOT NULL DEFAULT 0,
	`left` int NOT NULL DEFAULT 0,
	`new` int NOT NULL DEFAULT 0,
	`total` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_staff_department` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `pr_staff_department_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_ttbl` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`campus_requirement` int NOT NULL DEFAULT 0,
	`available` int NOT NULL DEFAULT 0,
	`working` int NOT NULL DEFAULT 0,
	`out_of_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_ttbl_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pr_workload` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report` int NOT NULL,
	`teacher_id` int NOT NULL,
	`work_load` int NOT NULL DEFAULT 0,
	CONSTRAINT `pr_workload_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `principal_report` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campus` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`student_remarks` varchar(255),
	`staff_remarks` varchar(255),
	`ttbl_remarks` varchar(255),
	`work_load_remarks` varchar(255),
	`hcs_remarks` varchar(255),
	`feedback` varchar(255),
	CONSTRAINT `principal_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campus` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`designation` int NOT NULL,
	`salary` int NOT NULL,
	`is_active` boolean NOT NULL,
	`date_joined` timestamp NOT NULL DEFAULT (now()),
	`status` int NOT NULL,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `staff_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `campus` ADD CONSTRAINT `campus_city_city_id_fk` FOREIGN KEY (`city`) REFERENCES `city`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `class` ADD CONSTRAINT `class_campus_campus_fk_id_fk` FOREIGN KEY (`campus`) REFERENCES `campus`(`fk_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `class_section` ADD CONSTRAINT `class_section_class_class_id_fk` FOREIGN KEY (`class`) REFERENCES `class`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `designation` ADD CONSTRAINT `designation_department_department_id_fk` FOREIGN KEY (`department`) REFERENCES `department`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_activity` ADD CONSTRAINT `pr_activity_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_class` ADD CONSTRAINT `pr_class_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_class_section` ADD CONSTRAINT `pr_class_section_class_pr_class_id_fk` FOREIGN KEY (`class`) REFERENCES `pr_class`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_hcd` ADD CONSTRAINT `pr_hcd_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_staff` ADD CONSTRAINT `pr_staff_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_staff` ADD CONSTRAINT `pr_staff_department_pr_staff_department_id_fk` FOREIGN KEY (`department`) REFERENCES `pr_staff_department`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_ttbl` ADD CONSTRAINT `pr_ttbl_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_workload` ADD CONSTRAINT `pr_workload_report_principal_report_id_fk` FOREIGN KEY (`report`) REFERENCES `principal_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pr_workload` ADD CONSTRAINT `pr_workload_teacher_id_staff_id_fk` FOREIGN KEY (`teacher_id`) REFERENCES `staff`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `principal_report` ADD CONSTRAINT `principal_report_campus_campus_fk_id_fk` FOREIGN KEY (`campus`) REFERENCES `campus`(`fk_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_campus_campus_fk_id_fk` FOREIGN KEY (`campus`) REFERENCES `campus`(`fk_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_designation_designation_id_fk` FOREIGN KEY (`designation`) REFERENCES `designation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_status_staff_status_id_fk` FOREIGN KEY (`status`) REFERENCES `staff_status`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_campus_id_fk` FOREIGN KEY (`user_id`) REFERENCES `campus`(`id`) ON DELETE no action ON UPDATE no action;