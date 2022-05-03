const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'rootroot',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

class Prompts {
    start() {
        inquirer
            .prompt({
                type: "list",
                message: "What would you like to do?",
                name: 'choice',
                choices: [
                    "VIEW ALL DEPARTMENTS",
                    "VIEW ALL ROLES",
                    "VIEW ALL EMPLOYEES",
                    "ADD A DEPARTMENT",
                    "ADD A ROLE",
                    "ADD AN EMPLOYEE",
                    "QUIT",
                ]
            })
            .then((data) => {
                switch (data.choice){
                    case "VIEW ALL DEPARTMENTS":
                        this.viewDept();
                        break;
                    case "VIEW ALL ROLES":
                        this.viewRoles();
                        break;
                    case "VIEW ALL EMPLOYEES":
                        this.viewEmployees();
                        break;
                    case "ADD A DEPARTMENT":
                        this.addDept();
                        break;
                    case "ADD A ROLE":
                        this.addRole();
                        break;
                    case "ADD AN EMPLOYEE":
                        this.addEmployee();
                        break;
                    case "QUIT":
                        process.exit();
                    default:
                        console.log("Error");
                }
            });
    }
    viewDept() {
        db.query('SELECT id, name FROM department', (err, results) => {
            if(err){
                console.log(err);
            }
            console.table(results);
            this.start();
        });
    }
    viewRoles() {
        db.query('SELECT role.id, role.title, department.name AS Department_Name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
            if(err){
                console.log(err);
            }
            console.table(results);
            this.start();
        });
    }
    viewEmployees() {
        db.query(`SELECT
            employees.id AS ID,
            CONCAT(employees.first_name, " ", employees.last_name) AS Employee,
            role.title AS Title,
            role.salary AS Salary,
            department.name AS Department,
            CONCAT(m.first_name, " ", m.last_name) AS Manager 
        FROM
            employees
        LEFT JOIN 
            employees m 
        ON 
            employees.manager_id = m.id
        JOIN
            role
        ON
            employees.role_id = role.id
        JOIN
            department
        ON
            role.department_id = department.id`, (err, results) => {
                    if(err) {
                console.log(err);
            }
            console.table(results);
            this.start();
        });
    }

    addDept() {
        inquirer
            .prompt({
                type: "input",
                name: "deptName",
                message: "Enter the name of the new department: "
            })
            .then((data) => {
                db.query(`INSERT INTO department (name)
                VALUE ("${data.deptName}");`, (err, results) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log("Success!");
                    this.start();
                });
            });
    }
    
    addRole() {
        db.query('SELECT id AS ID, name AS Department_Name FROM department', (err, results) => {
            if(err){
                console.log(err);
            }
            console.table(results);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "deptID",
                    message: "What is the ID of the department you would like to add your role in from the list above: ",
                    validate: (answer) => {
                        if(isNaN(answer)) {
                            return "Please enter a number";
                        }
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "roleName",
                    message: "Enter the name of the role: ",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the salary of the role: ",
                    validate: (answer) => {
                        if(isNaN(answer)) {
                            return "Please only use numbers";
                        }
                        return true;
                    }
                }
            ])
            .then((data) => {
                db.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${data.roleName}", ${data.salary}, ${data.deptID});`, (err, results) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log("Success!");
                    this.start();
                });
            })
        });
    }

    addEmployee() {
        db.query(`SELECT
            employees.id AS Employee_ID,
            CONCAT(employees.first_name, " ", employees.last_name) AS Employee_Name,
            role.id AS Role_ID,
            role.title AS Role_Name
        FROM
            employees
        JOIN
            role
        ON
            employees.role_id = role.id`, (err, results) => {
                if(err){
                    console.log(err);
                }
                console.table(results);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "fName",
                    message: "Enter the new employee's first name: "
                },
                {
                    type: "input",
                    name: "lName",
                    message: "Enter the new employee's last name: "
                },
                {
                    type: "imput",
                    name: "role",
                    message: "Enter the new employee's role ID from the list above: ",
                    validate: (answer) => {
                        if(isNaN(answer)) {
                            return "Please enter a number"
                        }
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "manId",
                    message: "Enter the ID of the employees manager from the list above, if emplyee is a manager, leave blank: ",
                    validate: (answer) => {
                        if(answer == null || !isNaN(answer)) {
                            return true;
                        }
                        return "Please enter a number or leave it blank";
                    }
                }
            ])
            .then((data) => {
                console.log(data);
            });
        });
    }
}

module.exports = Prompts;