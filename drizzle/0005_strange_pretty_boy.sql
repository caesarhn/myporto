CREATE TABLE `content_component` (
	`id` varchar(32) NOT NULL,
	`index` int NOT NULL,
	`content` varchar(10100),
	`tag` int,
	`content_id` varchar(32),
	`style` varchar(100),
	CONSTRAINT `content_component_id` PRIMARY KEY(`id`)
);
