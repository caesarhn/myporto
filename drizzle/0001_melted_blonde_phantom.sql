CREATE TABLE `content_root` (
	`id` varchar(32) NOT NULL,
	`tittle` varchar(512) NOT NULL,
	`preview_image` varchar(1048),
	`preview_description` varchar(1048),
	CONSTRAINT `content_root_id` PRIMARY KEY(`id`)
);
