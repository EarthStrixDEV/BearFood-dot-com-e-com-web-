const mysql = require('mysql')

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sql_data",
    port: "8889",
    multipleStatements: true
})
sql.connect((err) => {
    if (err) throw err;
    console.log("Connected SQL Database");
})

module.exports = sql;