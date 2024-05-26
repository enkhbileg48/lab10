DROP DATABASE IF EXISTS lab10;
CREATE DATABASE IF NOT EXISTS lab10;
USE lab10;

-- Priority table
DROP TABLE IF EXISTS priority;
CREATE TABLE IF NOT EXISTS priority (
    description VARCHAR(255),
    priority_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
);

-- Task status table
DROP TABLE IF EXISTS task_status;
CREATE TABLE IF NOT EXISTS task_status (
    description VARCHAR(255),
    task_status_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
);

INSERT INTO priority(description)
VALUES ('high'), ('mid'), ('low');

INSERT INTO task_status(description)
VALUES ('resolved'), ('resolving'), ('not resolved');

-- User table
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
) ENGINE=InnoDB; -- Ensure InnoDB storage engine for compatibility with foreign keys

-- Staff table
DROP TABLE IF EXISTS staff;
CREATE TABLE IF NOT EXISTS staff (
    name VARCHAR(255),
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Client table
DROP TABLE IF EXISTS client;
CREATE TABLE IF NOT EXISTS client (
    name VARCHAR(255),
    telephone_number INT,
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Task table acting as both task and report
DROP TABLE IF EXISTS task;
CREATE TABLE IF NOT EXISTS task (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    priority_id TINYINT UNSIGNED,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_date DATETIME,
    client_id INT,
    staff_id INT,
    task_status_id TINYINT UNSIGNED,
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
    FOREIGN KEY (priority_id) REFERENCES priority(priority_id),
    FOREIGN KEY (task_status_id) REFERENCES task_status(task_status_id)
) ENGINE=InnoDB; -- Ensure InnoDB storage engine for compatibility with foreign keys
