-- Preseeded data

INSERT INTO department (name)
VALUES  
("Management"),
("Payroll"),
("Compliance"),
("Talent Acquisition"),
("Sales"),
("Operations");

INSERT INTO role (title, salary, department_id)
VALUES
("Branch Manager", 200000, 1),
("Payroll Administrator", 60000, 2),
("Compliance Advocate", 50000, 3),
("Talent Acquisition Specialist", 65000, 4),
("Sales Specialist", 52000, 5),
("Account Representative", 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jonathan", "Perez", 1, NULL),
("Alejandra", "Miret", 4, 1),
("Beatrix", "Kiddo", 2, 1),
("Bill", "Kiddo", 5, 1),
("Vernita", "Green", 6, 1),
("O-Ren", "Ishii", 3, 1);
