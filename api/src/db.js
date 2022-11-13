const mysql = require('mysql')
require('dotenv').config()

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE
})

conection.connect(function(err){
    if(err)console.log(err);
    else console.log('DB its connected');
})

module.exports = conection