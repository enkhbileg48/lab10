drop database if exists lab10;
create database if not exists lab10;
use lab10;

-- priority table
drop table if exists priority;
create table if not exists priority (
    description varchar(255),
    priority_id tinyint unsigned auto_increment primary key
);

-- task status table
drop table if exists task_status;
create table if not exists task_status (
    description varchar(255),
    task_status_id tinyint unsigned auto_increment primary key
);

insert into priority(description)
values ("high"), ("mid"), ("low");

insert into task_status(description)
values ("resolved"), ("resolving"), ("not resolved");

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
) ENGINE=InnoDB; -- Ensure InnoDB storage engine for compatibility with foreign keys

-- staff table
drop table if exists staff;
create table if not exists staff (
    name VARCHAR(255),
    staff_id INT auto_increment primary key,
    user_id INT,
    foreign key (user_id) references user(user_id)
);

-- client table
drop table if exists client;
create table if not exists client (
    name varchar(255),
    telephone_number int,
    client_id int auto_increment primary key,
    user_id INT,
    foreign key (user_id) references user(user_id)
);

-- task table
drop table if exists task;
create table if not exists task (
    description varchar(255),
    priority_id tinyint unsigned,
    created_date datetime,
    resolved_date datetime,
    task_id int auto_increment primary key,
    client_id int,
    staff_id int,
    task_status_id tinyint unsigned,
    foreign key (client_id) references client(client_id),
    foreign key (staff_id) references staff(staff_id),
    foreign key (priority_id) references priority(priority_id),
    foreign key (task_status_id) references task_status(task_status_id)
);
