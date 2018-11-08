var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "mfresh",
    connectionLimit: 5,
    multipleStatements: true
});

module.exports = pool;