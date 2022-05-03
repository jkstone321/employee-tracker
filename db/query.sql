DEPARTMENTS

ENGINEERING
FINANCE
LEGAL
SALES

ROLES

SALES LEAD -> SALES -> 100K
SALESPERSON ->SALES -> 80K
LEAD ENGINEER -> ENGINEERING -> 150K
SOFTWARE ENGINEER -> ENGINEERING -> 120K
ACCOUNT MANAGER -> FINANCE -> 160K
ACCOUNTANT -> FINANCE -> 125K
LEGAL TEAM LEAD -> LEGAL -> 250K
LAWYER -> LEGAL -> 190K


EMPLOYEES

JOHN DOE -> SALES LEAD
MIKE CHAN -> SALESPERSON
ASHLEY RODRIGUEZ -> LEAD ENGINEER
KEVIN TUPIK -> SOFTWARE ENGINEER
KUNAL SINGH -> ACCOUNT MANAGER
MALIA BROWN -> ACCOUNTANT
SARAH LOURD -> LEGAL TEAM LEAD
TOM ALLEN -> LAWYER



TODO LIST

[X] VIEW ALL DEPARTMENTS
[X] VIEW ALL ROLES
[] VIEW ALL EMPLOYEES
[] ADD A DEPARTMENT
[] ADD A ROLES
[] ADD AN EMPLOYEES
[] UPDATE EMPLOYEE ROLES





JOIN department ON role.department_id = department.id

// Query database
// db.query(`SELECT * FROM employees`
// JOIN role ON employees.role_id = role.id 
// JOIN department ON role.department_id = department.id
// , function (err, results) {
//   console.table(results);
// });



 JOIN role ON employees.role_id = role.id



`SELECT 
    employees.id, 
    CONCAT(first_name, " ", last_name) AS Name, 
    role.title, 
    role.salary,
    employees.manager_id
FROM 
    employees 
JOIN 
    role 
ON 
    employees.role_id = role.id`






`SELECT
    CONCAT(e.first_name, " ", e.last_name) AS Employee,
    CONCAT(m.first_name, " ", m.last_name) AS Manager
FROM 
    employees e, 
    employees m 
WHERE 
    e.manager_id = m.id`



think of them as 2 different files maybe will work?
