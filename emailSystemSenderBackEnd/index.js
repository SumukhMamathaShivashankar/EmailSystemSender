const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();
const nodemailer=require("nodemailer");
app.use(cors());
app.use(express.json());
//mysql connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users',
    port:'3306'

})
//check database connection
db.connect(err =>{
    if(err){console.log('err')}
    console.log('Database Connected')
})
// app.listen (3000, ()=>{
// console.log("Server is runing  on 3000 PORT");
// })
// get data
// app.get('/userTable',(req,res)=>{
//     // console.log('get users');
//     let query= `SELECT * FROM userTable`;
//     db.query(query,(err,results)=>{
//         if(err){
//             console.log(err,'error executing query')
//         }
//         if(results.length>0){
//             res.send({
//                 message:'users data :',
//                 data:results
//             })
//         }
//     })
// })
const getAllData = (req,res)=>{
        // console.log('get users');
        let query= `SELECT * FROM userTable`;
        db.query(query,(err,results)=>{
            if(err){
                console.log(err,'error executing query')
            }
            if(results.length>0){
                res.send({
                    message:'users data :',
                    data:results
                })
            }
        })
    }
// get data of single user by id
// app.get('/userTable/:id',(req,res)=>{
//     // console.log('get users by id  ');
//     // console.log(req.params.id);
//     let userId= req.params.id;
//     let query= `SELECT * FROM userTable where id = ${userId}`;
//     db.query(query,(err,results)=>{
//         if(err){
//             console.log(err,'error executing query to get user by id')
//         }
//         if(results.length>0){
//             res.send({
//                 message:'users data by ID:',
//                 data:results
//             })
//         }
//         else{
//             res.send({
//                 message:"data not found for the given user ID"
//             })
//         }
//     })
// })

const getDataByIndex = (req,res)=>{
    // console.log('get users by id  ');
    // console.log(req.params.id);
    let userId= req.params.id;
    let query= `SELECT * FROM userTable where id = ${userId}`;
    db.query(query,(err,results)=>{
        if(err){
            console.log(err,'error executing query to get user by id')
        }
        if(results.length>0){
            res.send({
                message:'users data by ID:',
                data:results
            })
        }
        else{
            res.send({
                message:"data not found for the given user ID"
            })
        }
    })
}

//post data to database
// app.post('/userPost',(req,res)=>{
//     // console.log(req.body,'server is running ')
//     let requestFullname = req.body.fullName
//     let requestEmail = req.body.email
//     let requestPhone = req.body.phone
//     let query = `insert into userTable (fullName,email,phone) value ('${requestFullname}','${requestEmail}','${requestPhone}')`
//     db.query(query,(err,results)=>{
//         if(err){console.log(err)}
//         res.send({
//             message:"Data inserted"
//             })


//     })
// })
const postData = (req, res) => {
    console.log("hii")
    let requestFullname = req.body.fullName
    let requestEmail = req.body.email
    let requestPhone = req.body.phone
    let query = `insert into userTable (fullName,email,phone) value ('${requestFullname}','${requestEmail}','${requestPhone}')`
    db.query(query,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data inserted"
            })


    })
}
//update data
// app.put('/usersPut/:id',(request,response)=>{
//     let requestFullname = request.body.fullName
//     let requestEmail = request.body.email
//     let requestPhone = request.body.phone
//     let userId=request.params.id;
//     let query = `update userTable set fullName = '${requestFullname}' ,email = '${requestEmail}',phone = '${requestPhone}' where id = ${userId}`
//     db.query(query,(error,result)=>{
//         if(error){console.log(error)}
//         response.send({
//             message:"data updated"
//         })
//     })

// })

const updateData  = (request,response)=>{
    let requestFullname = request.body.fullName
    let requestEmail = request.body.email
    let requestPhone = request.body.phone
    let userId=request.params.id;
    let query = `update userTable set fullName = '${requestFullname}' ,email = '${requestEmail}',phone = '${requestPhone}' where id = ${userId}`
    db.query(query,(error,result)=>{
        if(error){console.log(error)}
        response.send({
            message:"data updated"
        })
    })

}
//delete data
// app.delete('/usersDelete/:id',(request,response)=>{
//     let userId=request.params.id;
//     let query = `delete from userTable where id =  ${userId}`
//     db.query(query,(error,result)=>{
//         if(error){console.log(error)}
//         response.send({
//             message:"data deleted"
//         })
//     })
// })

const deleteData = (request,response)=>{
    let userId=request.params.id;
    let query = `delete from userTable where id =  ${userId}`
    db.query(query,(error,result)=>{
        if(error){console.log(error)}
        response.send({
            message:"data deleted"
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