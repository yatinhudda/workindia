const express = require('express');
const connection = require('../../connector');
const bcrypt = require('bcrypt');
const app = express.Router();
app.use(express.json());
let userid = 0;

// @POST /app/user
// DESC:- Api tp register a new user
app.post('/',(req,res)=>{
    const {username,password} = {...req.body};
    userid++;
    const row =[[userid,username,password]];
    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        row[0][2] = hash;
        let sql = 'insert into users(id,username,password) values ?';
    connection.query(sql,[row],(err,result)=>{
        if(err)
            {
                console.log(err);
                res.json({"status":"Something went wrong",isSuccess:false});
            }
        else{
            res.json({"status":"User created successfully",isSuccess:true});
            
    }
    });
    });
    
})
//@POST /api/user/auth
// DESC:- API to login a user in the portal

app.post('/auth',(req,res)=>{
    const {username,password} = {...req.body};
    let sql = 'select id,password from users where username = ?';
    connection.query(sql,[[username]],(err,result)=>{
        console.log(result);
        if(err){
            console.log(err);
            res.json({"status":"Failed",userId:null});
        }
        else{
            console.log(result);
           if(result.length == 0){
               res.json({"status":"falied",userId:null,"msg":"No such id exist"});
           }
           else{
             bcrypt.compare(password,result[0].password,(err,isMatch)=>{
                 console.log(isMatch);
                 if(isMatch){
                     res.json({"status":"success",userId:result[0].id,"msg":"Login success"});
                 }
                 else{
                     res.json({"status":"Failed",userId:null,"msg":"invalid credentials"});
                 }
             });
           }
        }
    })


});
module.exports = app;