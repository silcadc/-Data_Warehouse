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

CREATE TABLE `regions` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`region_id`)
);

CREATE TABLE `countries` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `region_id` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`country_id`),
  KEY `region_id_idx` (`region_id`),
  CONSTRAINT `region_id_FK_region_countries` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`)
);

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
  PRIMARY KEY (`contact_id`),
  KEY `FK_company_contacts_idx` (`company_id`),
  KEY `FK_city_contacts_idx` (`city_id`),
  CONSTRAINT `FK_city_contacts` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `FK_company_contacts` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
);

CREATE TABLE `channels` (
  `channel_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`channel_id`)
);

CREATE TABLE `data_warehouse`.`preferences` (
  `preferences_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`preferences_id`));

CREATE TABLE `data_warehouse`.`prefe_cont_chann` (
  `pre_cont_chan_id` INT NOT NULL AUTO_INCREMENT,
  `contact_id` INT NULL,
  `channel_id` INT NULL,
  `preferences_id` INT NULL,
  `user_account` VARCHAR(45) NULL,
  PRIMARY KEY (`pre_cont_chan_id`),
  INDEX `FK_pcc_contact_idx` (`contact_id` ASC) VISIBLE,
  INDEX `FK_pcc_channel_idx` (`channel_id` ASC) VISIBLE,
  INDEX `FK_pcc_preference_idx` (`preferences_id` ASC) VISIBLE,
  CONSTRAINT `FK_pcc_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `data_warehouse`.`contacts` (`contact_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_pcc_channel`
    FOREIGN KEY (`channel_id`)
    REFERENCES `data_warehouse`.`channels` (`channel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_pcc_preference`
    FOREIGN KEY (`preferences_id`)
    REFERENCES `data_warehouse`.`preferences` (`preferences_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

