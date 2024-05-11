//db.js
const mysql = require('mysql2');

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } =require('../config')

const conexion = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
});

conexion.connect((error)=>{
    if(error){
        console.log('UPS! el problema con la conexión es : '+error);
        return;
    }else{
        console.log('¡La conexón con la base de datos ha sido exitosa!');
    }
});

module.exports = conexion; 