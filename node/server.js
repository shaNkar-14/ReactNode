const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({ host: "localhost",
                                    user: "root",                               
                                    password: "siva",
                                    database: "shankar" })
app.get("/api/v1/employees/", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM employees ";
    db.query(sql, [id], (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});



app.get("/api/v1/employees/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM employees where ID= ? ";
    db.query(sql, [id], (err, results) => {
        if (err)  throw err;
        return res.json(results);
    })

});

app.post("/api/v1/employees", (req, res) => {

    const sql = "INSERT INTO employees (`department`,`dob`,`email_id`,`first_name`,`last_name`,`gender`,`salary`,`image`) VALUES (?)";
    const values = [
        req.body.department,
        req.body.dob,
        req.body.email_id,
        req.body.first_name,
        req.body.last_name,
        req.body.gender,
        req.body.salary,
        req.body.image
        
    ]
    db.query(sql, [values], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })
})

app.put("/api/v1/employees/:id", (req, res) => {
    const sql = "update employees set `department` = ?,`dob` = ?,`email_id` = ?,`first_name` = ?,`last_name` =?,`gender`= ?,`salary` = ?,`image`= ? where ID = ?";
    
    const values = [req.body.department,req.body.dob,req.body.email_id,req.body.first_name,req.body.last_name,req.body.gender,req.body.salary,req.body.image]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) throw err;
        return res.json(data);

    })
})

app.delete("/api/v1/employees/:id", (req, res) => {

    const sql = "DELETE FROM employees WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })
})
app.post("/reguser", async (req, res) => {

    const sql = "INSERT INTO reguser (`name`,`email`,`password`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) throw err;
        return res.json(data);
    })

})
app.post('/login', (req, res) => {

    const sql = "SELECT * FROM reguser WHERE `email` = ? AND `password` = ?";
 
    db.query(sql, [req.body.email, req.body.password], (err, data) => {

        if (err) { 
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success")
        }
        else {
            return res.json("Fail")
        }
    })

})
app.listen(8081, () => { console.log("Running Successfully"); })






// const express = require("express");
// const bcrypt = require("bcrypt")
// const cors = require("cors");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const app = express();
// const path = require("path");
// const multer = require("multer");
// const buffer = require('buffer');
// app.use(cors());

// // app.use(express.static("./public"));

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json());

// // const upload = multer({ storage: multer.memoryStorage });

// var upload = multer({
//     dest: 'uploads/',
//     storage: multer.memoryStorage()
// });

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "siva",
//   database: "shankar",
// });

// app.post("/reguser", async (req, res) => {
//   const sql = "INSERT INTO reguser (`name`,`email`,`password`) VALUES (?)";
//   var value=req.body.password;
//   const salt=await bcrypt.genSalt(20);
//   value = await bcrypt.hash(value,salt)
//   const values = [req.body.name, req.body.email, value];
//   db.query(sql, [values], (err, data) => {
//     if (err) throw err;
//     return res.json(data);
//   });
// });
// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM reg_user WHERE `email` = ? AND `password` = ?";
//     db.query(sql, [req.body.email, req.body.password], (err, data) => {
//         if(err){
//              return res.json("Error");
//         }
//         if(data.length > 0) {
//             return res.json("Success")
//         }
//         else{
//             return res.json("Failed")
//         }
//     })
// })

// app.get("/api/v1/employees", (req, res) => {
//     const sql = "SELECT * FROM employees";
//     db.query(sql, (err, data) => {
//       if (err) throw err;
//       const employeesWithImages =
//             data.map(employee => {
//                 if (employee.image) {
//                     employee.image =
//                         Buffer.from(employee.image, 'binary').toString('base64');
//                 }
//                 return employee;
//             });
//         return res.json(employeesWithImages);
//     });
//   });
// app.post("/api/v1/employees", upload.any("image"), (req, res) => {
//   const sql =
//     "INSERT INTO employees (`first_name`,`last_name`,`email_id`,`department`,`salary`,`gender`,`dob`,`image`) VALUES (?)";
//     const values = [
//                 req.body.department,
//                 req.body.dob,
//                 req.body.email_id,
//                 req.body.first_name,
//                 req.body.last_name,
//                 req.body.gender,
//                 req.body.salary,
//                 req.body.image
                
//             ];
//   db.query(sql, [values], (err, data) => {
//     if (err) throw err;
//     return res.json(data);
//   });
// });

// app.get("/api/v1/employees/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM employees WHERE ID = ?";
//   db.query(sql, [id], (err, data) => {
//     if (err) throw err;
//     const employeesWithImages =
//             data.map(employee => {
//                 if (employee.image) {
//                     employee.image =
//                         Buffer.from(employee.image, 'binary').toString('base64');
//                 }
//                 return employee;
//             });
//         return res.json(employeesWithImages);
//   });
// });

// app.put("/api/v1/employees/:id",  upload.any("image"), (req, res) => {
//     const id = req.params.id;
//   const sql =
//     "UPDATE employees SET  `first_name` = ?,`last_name` = ?,`email_id` = ?,`department` = ?,`salary` = ?,`gender` = ?,`dob` = ?,`image` = ? WHERE ID = ?";
//   const values = [
//     req.body.department,
//                 req.body.dob,
//                 req.body.email_id,
//                 req.body.first_name,
//                 req.body.last_name,
//                 req.body.gender,
//                 req.body.salary,
//                 req.body.image,
//   ];
//   db.query(sql, [...values, id], (err, data) => {
//     if (err) throw err;
//     return res.json(data);
//   });
// });
// app.delete("/api/v1/employees/:id", (req, res) => {
//   const sql = "DELETE FROM employees WHERE ID = ?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, data) => {
//     if (err) throw err;
//     return res.json(data);
//   });
// });
// app.listen(8081, () => {

//   console.log("listening");

// });