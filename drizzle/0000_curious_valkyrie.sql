CREATE TABLE `creator` (
	`id` varchar(32) NOT NULL,
	`name` varchar(255) NOT NULL,
	`creator_img` varchar(1048),
	`creator_link` varchar(1048),
	CONSTRAINT `creator_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` varchar(32) NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
