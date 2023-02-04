const mysql = require('mysql')

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889
})
const sqlConnector = sql.connect((err) => {
    if (err) throw err;
    console.log("Connected SQL Database");
})

module.exports = sqlConnector;