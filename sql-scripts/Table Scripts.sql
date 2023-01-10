 -- User Table--

CREATE TABLE `user_table` (
  `user_id` bigint NOT NULL,
  `user_status_id` int NOT NULL,
  `user_type_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `created_date` date NOT NULL,
  `modified_date` date NOT NULL,
  `created_by` int NOT NULL,
  `modified_by` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `user_type_id_idx` (`user_type_id`),
  KEY `user_status_id_idx` (`user_status_id`),
  CONSTRAINT `user_status_id` FOREIGN KEY (`user_status_id`) REFERENCES `status_table` (`user_status_id`),
  CONSTRAINT `user_type_id` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Type -- 

CREATE TABLE `user_type` (
  `user_type_id` int NOT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Status --

CREATE TABLE `status_table` (
  `user_status_id` int NOT NULL,
  `user_description` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  `modify_date` date NOT NULL,
  PRIMARY KEY (`user_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Log History --

CREATE TABLE `user_log_history_table` (
  `login_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  `device_type` varchar(20) NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`login_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Notification Status -- 

CREATE TABLE `nstatus_table` (
  `nstatus_id` int NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`nstatus_id`),
  UNIQUE KEY `status_id_UNIQUE` (`nstatus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Notification Table -- 

CREATE TABLE `notification_table` (
  `notification_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_date` date NOT NULL,
  `receiver_email` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  UNIQUE KEY `notification_id_UNIQUE` (`notification_id`),
  KEY `user_id_idx` (`status`),
  CONSTRAINT `status` FOREIGN KEY (`status`) REFERENCES `nstatus_table` (`nstatus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci