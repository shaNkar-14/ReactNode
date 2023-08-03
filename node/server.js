// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const mysql = require("mysql");
// const app = express();
// app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({ host: "localhost",
//                                     user: "root",                               
//                                     password: "siva",
//                                     database: "shankar" })
// app.get("/api/v1/employees/", (req, res) => {
//     const id = req.params.id;

//     const sql = "SELECT * FROM employees ";
//     db.query(sql, [id], (err, data) => {
//         if (err) throw err;
//         return res.json(data);
//     });
// });



// app.get("/api/v1/employees/:id", (req, res) => {

//     const id = req.params.id;

//     const sql = "SELECT * FROM employees where ID= ? ";
//     db.query(sql, [id], (err, results) => {
//         if (err)  throw err;
//         return res.json(results);
//     })

// });

// app.post("/api/v1/employees", (req, res) => {

//     const sql = "INSERT INTO employees (`department`,`dob`,`email_id`,`first_name`,`last_name`,`gender`,`salary`,`image`) VALUES (?)";
//     const values = [
//         req.body.department,
//         req.body.dob,
//         req.body.email_id,
//         req.body.first_name,
//         req.body.last_name,
//         req.body.gender,
//         req.body.salary,
//         req.body.image
        
//     ]
//     db.query(sql, [values], (err, data) => {
//         if (err)  throw err;
//         return res.json(data);
//     })
// })

// app.put("/api/v1/employees/:id", (req, res) => {
//     const sql = "update employees set `department` = ?,`dob` = ?,`email_id` = ?,`first_name` = ?,`last_name` =?,`gender`= ?,`salary` = ?,`image`= ? where ID = ?";
    
//     const values = [req.body.department,req.body.dob,req.body.email_id,req.body.first_name,req.body.last_name,req.body.gender,req.body.salary,req.body.image]
//     const id = req.params.id;
//     db.query(sql, [...values, id], (err, data) => {
//         if (err) throw err;
//         return res.json(data);

//     })
// })

// app.delete("/api/v1/employees/:id", (req, res) => {

//     const sql = "DELETE FROM employees WHERE ID = ?";
//     const id = req.params.id;
//     db.query(sql, [id], (err, data) => {
//         if (err)  throw err;
//         return res.json(data);
//     })
// })

// app.post("/reguser", async (req, res) => {

//     const sql = "INSERT INTO reguser (`name`,`email`,`password`) VALUES (?)";

//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql, [values], (err, data) => {
//         if (err) throw err;
//         return res.json(data);
//     })

// })

// app.post('/login', (req, res) => {

//     const sql = "SELECT * FROM reguser WHERE `email` = ? AND `password` = ?";
 
//     db.query(sql, [req.body.email, req.body.password], (err, data) => {

//         if (err) { 
//             return res.json("Error");
//         }
//         if (data.length > 0) {
//             return res.json("Success")
//         }
//         else {
//             return res.json("Fail")
//         }
//     })

// })
// app.listen(8081, () => { console.log("Running Successfully"); })



const { Pool } = require('pg');

// Replace these connection details with your PostgreSQL database configuration
const pool = new Pool({
  user: 'root  ',
  host: 'localhost',
  database: 'Siva',
  password: 'siva16',
  port: 5432 // Default PostgreSQL port is 5432
});

// Test the connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    // You can execute queries here using the client object
    // For example: client.query('SELECT * FROM your_table', (err, result) => { /* ... */ });
  }
});


// pool.query('SELECT * FROM employees', (err, result) => {
//   if (err) {
//     console.error('Error executing query:', err);
//   } else {
//     console.log('Query result:', result.rows);
//   }
// });

// pool.query('SELECT * FROM employees', (err, result) => {
//   if (err) {
//     console.error('Error executing query:', err);
//   } else {
//     console.log('Query result:', result.rows);
//   }

//   // Release the client back to the pool
//   done();
// });