const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();
const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json());
//mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: '3306'

})
//check database connection
db.connect(err => {
    if (err) {
        error.log('err')
    }
})

// api to get all data
const getAllData = (req, res) => {
    let query = `SELECT * FROM userTable`;
    db.query(query, (err, results) => {
        if (err) {
            error.log(err, 'error executing query')
        }
        if (results.length > 0) {
            res.send({
                message: 'users data :',
                data: results
            })
        }
    })
}
// api to get get single data by index
const getDataByIndex = (req, res) => {
    let userId = req.params.id;
    let query = `SELECT * FROM userTable where id = ${userId}`;
    db.query(query, (err, results) => {
        if (err) {
            error.log(err, 'error executing query to get user by id')
        }
        if (results.length > 0) {
            res.send({
                message: 'users data by ID:',
                data: results
            })
        } else {
            res.send({
                message: "data not found for the given user ID"
            })
        }
    })
}

// api to post data/ add user
const postData = (req, res) => {
    let requestFullname = req.body.fullName
    let requestEmail = req.body.email
    let requestPhone = req.body.phone
    let query = `insert into userTable (fullName,email,phone) value ('${requestFullname}','${requestEmail}','${requestPhone}')`
    db.query(query, (err, results) => {
        if (err) {
            error.log(err)
        }
        res.send({
            message: "Data inserted"
        })


    })
}

// api to update data
const updateData = (request, response) => {
    let requestFullname = request.body.fullName
    let requestEmail = request.body.email
    let requestPhone = request.body.phone
    let userId = request.params.id;
    let query = `update userTable set fullName = '${requestFullname}' ,email = '${requestEmail}',phone = '${requestPhone}' where id = ${userId}`
    db.query(query, (error, result) => {
        if (error) {
            error.log(error)
        }
        response.send({
            message: "data updated"
        })
    })

}

//api to delete data
const deleteData = (request, response) => {
    let userId = request.params.id;
    let query = `delete from userTable where id =  ${userId}`
    db.query(query, (error, result) => {
        if (error) {
            error.log(error)
        }
        response.send({
            message: "data deleted"
        })
    })
}
module.exports = {
    postData,
    getAllData,
    getDataByIndex,
    updateData,
    deleteData
}