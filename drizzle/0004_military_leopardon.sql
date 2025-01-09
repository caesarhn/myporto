CREATE TABLE `account` (
	`id` varchar(32) NOT NULL,
	`username` varchar(128) NOT NULL,
	`password` varchar(128) NOT NULL,
	`creatorid` varchar(32) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`),
	CONSTRAINT `account_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(32) NOT NULL,
	`user_id` varchar(32) NOT NULL,
	`session_id` varchar(128) NOT NULL,
	`expired` varchar(128) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users_table`;