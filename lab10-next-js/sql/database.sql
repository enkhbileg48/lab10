drop database if exists lab10;
create database if not exists lab10;
use lab10;

-- staff table
drop table if exists staff;
create table if not exists staff (
    name VARCHAR(255),
    staff_id INT auto_increment primary key
);


-- client table
drop table if exists client;
create table if not exists client
	(
	name varchar(255),
    telephone_number int,
    client_id int auto_increment primary key
    );

-- task table
drop table if exists task;
create table if not exists task
	(
	description varchar(255),
    priority_id tinyint unsigned,
    created_date datetime,
    resolved_date datetime,
    task_id int auto_increment primary key,
    client_id int,
    staff_id int
    );

-- priority table
drop table if exists priority;
create table if not exists priority
	(
	description varchar(255),
    priority_id tinyint unsigned auto_increment primary key
    );
    
-- task status table
drop table if exists task_status;
create table if not exists task_status
	(
	description varchar(255),
    task_status_id tinyint unsigned auto_increment primary key
    );
    
-- foreign keys
alter table task
add constraint fk_staff_id
foreign key(staff_id)
references staff(staff_id),
--
add constraint fk_task_status_id
foreign key(task_status_id)
references task_status(task_status_id),
--
add constraint fk_priority_id
foreign key(priority_id)
references priority(priority_id),
--
add constraint fk_client_id
foreign key(client_id)
references client(client_id);

insert into priority(description)
values	("high"),("mid"),("low");

insert into task_status(description)
values	("resolved"),("resolving"),("not resolved");