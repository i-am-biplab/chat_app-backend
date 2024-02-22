const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

connection.connect((err) => {
    if (err) {
        console.error("Error while connecting to the DB", err);
    }
    else {
        console.log("Connected to the DB successfully");
    }
});

module.exports = connection;