const express = require('express');
const connection = require('./connector');
const userRouter = require('./Routes/User/User');
const siteRouter = require('./Routes/Sites/Sites');
const app = express();
app.use(express.json())
app.use('/app/user',userRouter);
app.use('/app/sites',siteRouter);
app.listen(3000,()=>{
    console.log("App started");
});
connection.connect(err=>{
      if(err){
          console.log(err);
      }
      else{
          console.log("MYSql conected");
      }
  });
 