//  imports the necessary packages
const inquirer = require('inquirer');
const connection = require('../config/connection');
require('console.table');

// Displays a list of actions that the user can perform, such as viewing employees, roles, and departments, adding a new employee, role, or department, updating an employee's role, and quitting the application. 
// The function prompts the user to select an action and then executes the corresponding function based on the user's input.
const mainMenu = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Pick an action',
      choices: [
        'View Employees',
        'View Roles',
        'View Departments',
        'Add New Employee',
        'Add New Role',
        'Add a Department',
        'Update Employee Roles',
        'Quit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Employees':
          viewEmployees();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'View Departments':
          viewDepartments();
          break;
        case 'Add New Employee':
          addEmployee();
          break;
        case 'Add New Role':
          addRole();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Update Employee Roles':
          updateEmployeeRole();
          break;
        case 'Quit':
          connection.end();
          break;
        default:
          console.log('Invalid selection.');
          mainMenu();
          break;
      }
    });
};

// displays a table of all employees in the database, along with their first and last name, job title, and department. 
// The function executes a SQL query to retrieve the employee data and then uses the console.table package to format and display the data in a table.
const viewEmployees = () => {
  const query = `
      SELECT e.id, e.first_name, e.last_name, r.title, d.name
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id;
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// function displays a table of all job roles in the database, along with their title, salary, and department. 
// The function executes a SQL query to retrieve the job role data and then uses the console.table package to format and display the data in a table.
const viewRoles = () => {
  const query = `
      SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      INNER JOIN department d ON r.department_id = d.id
    `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// displays a table of all departments in the database, along with their name and ID. 
// The function executes a SQL query to retrieve the department data and then uses the console.table package to format and display the data in a table.
const viewDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// Prompts the user to enter information about a new employee, such as their first and last name, job role, and manager. 
// The function executes SQL queries to retrieve the list of existing employees and job roles, and then uses the inquirer package to prompt the user for the new employee's information. 
// Finally, the function executes an SQL query to insert the new employee data into the database.
const addEmployee = () => {
  // Get the list of existing employees for the manager prompt
  connection.query('SELECT * FROM employee', (err, employeeResults) => {
    if (err) throw err;
    // Get the list of available roles
    connection.query('SELECT * FROM role', (err, roleResults) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'first_name',
            type: 'input',
            message: "What is the new employee's first name?"
          },
          {
            name: 'last_name',
            type: 'input',
            message: "What is the new employee's last name?"
          },
          {
            name: 'role_id',
            type: 'list',
            message: "What is the new employee's role?",
            choices: roleResults.map((role) => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            name: 'manager_id',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: [
              { name: 'None', value: null },
              ...employeeResults.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              })),
            ],
          },
        ])
        .then((answer) => {
          connection.query('INSERT INTO employee SET ?', answer, (err) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            mainMenu();
          });
        });
    });
  });
};



// prompts the user to enter information about a new job role, such as its title, salary, and department. 
// The function executes an SQL query to retrieve the list of existing departments, and then uses the inquirer package to prompt the user for the new role's information. 
// Finally, the function executes an SQL query to insert the new role data into the database.
const addRole = () => {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the Job Title'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary'
        },
        {
          name: 'department_id',
          type: 'list',
          message: 'Which department does this role belong to?',
          choices: results.map((department) => department.name)
        }
      ])
      .then((answer) => {
        const department = results.find((department) => department.name === answer.department_id);
        const role = {
          title: answer.title,
          salary: answer.salary,
          department_id: department.id
        };
        connection.query('INSERT INTO role SET ?', role, (err) => {
          if (err) throw err;
          console.log('Role was added successfully!');
          mainMenu();
        });
      });
  });
};



// prompts the user to enter information about a new department, such as its name. 
// The function uses the inquirer package to prompt the user for the new department's information, and then executes an SQL query to insert the new department data into the database.
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter department name'
      }
    ])
    .then((answer) => {
      connection.query('INSERT INTO department SET ?', answer, (err) => {
        if (err) throw err;
        console.log('Department added successfully!');
        mainMenu();
      });
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Please enter employee id in order to make your changes'
      },
      {
        name: 'new_role_id',
        type: 'input',
        message: 'Enter new id'
      }
    ])
    .then((answer) => {
      connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.new_role_id, answer.employee_id], (err) => {
        if (err) throw err;
        console.log('Employee id updated successfully!');
        mainMenu();
      });
    });
};

mainMenu();