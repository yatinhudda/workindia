const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     :'root',
    password : 'Placement@123',
    database : 'mydb',
    port:3306
  });

  module.exports = connection