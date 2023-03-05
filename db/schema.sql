-- Drop the employees_db database if it exists and create the employees_db database
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Use the employees_db database
USE employees_db;

-- Create the department table
CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

-- Create the role table
CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(15, 2) NOT NULL,
department_id INT,
FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Create the employee table
CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL
);