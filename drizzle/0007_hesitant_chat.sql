ALTER TABLE `session` ADD `creator_id` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_creator_id_creator_id_fk` FOREIGN KEY (`creator_id`) REFERENCES `creator`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator` DROP COLUMN `account_id`;