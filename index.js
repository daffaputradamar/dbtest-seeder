const fs = require("fs");
var mysql = require("mysql");
var faker = require("faker");

//Konfigurasi Koneksi
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyek3_testtable",
});

//Nama File Gambar
const img = "wa.png";
function readImageFile(file = "wa.png") {
    // read binary data from a file:
    const bitmap = fs.readFileSync(file);
    const buf = Buffer.from(bitmap);
    return buf;
}

connection.connect();

// Create Tabel

// connection.query(
//     `
// CREATE TABLE IF NOT EXISTS test (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     firstname VARCHAR(255) NOT NULL,
//     lastname VARCHAR(255) NOT NULL,
//     picture LONGBLOB NOT NULL
// );
// `,
//     function (error, results, fields) {
//         if (error) throw error;
//         console.log("The result is: ", results);
//     }
// );

// Insert Tabel
const data = readImageFile();
let sql = `INSERT INTO test (firstname, lastname, picture) VALUES `;
let values = [];

// Insert dilakukan 100x setiap run (kebanyakan akan error) -- Kodingan tidak perlu dirubah
for (let i = 0; i < 100; i++) {
    sql += `(?, ?, ?),`;
    values.push(faker.name.firstName(), faker.name.lastName(), data);
}
sql = sql.replace(/,\s*$/, ";");

connection.query(sql, values, function (error, results, fields) {
    if (error) throw error;
    console.log("The result is: ", results);
});

connection.end();
