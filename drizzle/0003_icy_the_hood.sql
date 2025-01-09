ALTER TABLE `content_root` ADD `posted` varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE `content_root` ADD `updated` varchar(32);--> statement-breakpoint
ALTER TABLE `content_root` ADD `view` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `content_root` ADD `like` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `content_root` ADD `content_link` varchar(1048);