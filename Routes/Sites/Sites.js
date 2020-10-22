const express = require('express');
const connection = require('../../connector');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('mysupersecret');
const app = express.Router();
app.use(express.json());
app.get('/list/:userId',(req,res)=>{
    const userId = req.params.userId;
    let sql = 'select website,password from websitedata where id = ?';
    connection.query(sql,[[userId]],(err,result)=>{
        if(err){
            console.log(err);
            res.json({"msg":"Something went wrong",isSuccess:false,data:null});
        }
        else{
            
           
            const decryptedData = result.map(row=>{
                
                row.password = cryptr.decrypt(row.password);
            })

           
            res.json({"msg":"Success",result});
        }
    })
});


app.post('/:userId',(req,res)=>{
    const userId = req.params.userId;
    const {username,password,website} = {...req.body};
    const encryptedPassword = cryptr.encrypt(password);
    let sql ='insert into websitedata(id,username,password,website) values ?';
    connection.query(sql,[[[userId,username,encryptedPassword,website]]],(err,result)=>{
        if(err){
            console.log(err);
            res.json({"status":"Something went wrong",isSuccess:false});
        }

        else{
            res.json({"status":"Success",isSuccess:true});
        }

    });
   

})

module.exports = app;