const mySql = require("mysql");

// configuration ke mysql / phpmyadmin
const koneksi = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api_backend",
  multipleStatements: true,
});

// log error untuk koneksi
koneksi.connect((err) => {
  if (err) throw err;
  console.log("terhubung ke MySql...");
});

module.exports = koneksi;
