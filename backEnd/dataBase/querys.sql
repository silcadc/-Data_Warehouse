CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `country_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `country_id_idx` (`country_id`),
  CONSTRAINT `country_id_FK_Countries_City` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`)
);

CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `FK_city_companies_idx` (`city_id`),
  CONSTRAINT `FK_city_companies` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`)
);

CREATE TABLE `contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `profile` varchar(45) DEFAULT NULL,
  `interests` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `FK_company_contacts_idx` (`company_id`),
  KEY `FK_city_contacts_idx` (`city_id`),
  CONSTRAINT `FK_city_contacts` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `FK_company_contacts` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
);

CREATE TABLE `countries` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `region_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`country_id`),
  KEY `region_id_idx` (`region_id`),
  CONSTRAINT `region_id_FK_region_countries` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`)
);

CREATE TABLE `preferences` (
  `preferences_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`preferences_id`)
);

CREATE TABLE `regions` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`region_id`)
);

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `profile` varchar(45) DEFAULT NULL,
  `is_admin` tinyint DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

INSERT INTO `data_warehouse`.`users`
(
`name`,
`lastname`,
`email`,
`profile`,
`is_admin`,
`password`)
VALUES
('Matt',
'Murdock',
'admin@admin.com',
'admin',
true,
'123456');

INSERT INTO `data_warehouse`.`users`
(
`name`,
`lastname`,
`email`,
`profile`,
`is_admin`,
`password`)
VALUES
('Foggy',
'Fog',
'basic@basic.com',
'basico',
false,
'123456');