// var express = require("express");
// var cors = require("cors");
// var app = express();
// const port = 3000;

// app.use(cors());

// app.get("/", (req, res) => {
//   res.json({
//     status: true,
//     data: [
//       {
//         id: 1,
//         nama: "Ahmad Fauzi",
//         email: "ahmad@gmail.com",
//         password: "123456",
//         telp: "081234567801",
//       },
//       {
//         id: 2,
//         nama: "Siti Rahma",
//         email: "siti@gmail.com",
//         password: "123456",
//         telp: "081234567802",
//       },
//       {
//         id: 3,
//         nama: "Budi Santoso",
//         email: "budi@gmail.com",
//         password: "123456",
//         telp: "081234567803",
//       },
//       {
//         id: 4,
//         nama: "Dewi Lestari",
//         email: "dewi@gmail.com",
//         password: "123456",
//         telp: "081234567804",
//       },
//       {
//         id: 5,
//         nama: "Rizky Maulana",
//         email: "rizky@gmail.com",
//         password: "123456",
//         telp: "081234567805",
//       },
//       {
//         id: 6,
//         nama: "Nanda Putri",
//         email: "nanda@gmail.com",
//         telp: "081234567806",
//       },
//       {
//         id: 7,
//         nama: "Hadi Prasetyo",
//         email: "hadi@gmail.com",
//         telp: "081234567807",
//       },
//       {
//         id: 8,
//         nama: "Aulia Safitri",
//         email: "aulia@gmail.com",
//         telp: "081234567808",
//       },
//       {
//         id: 9,
//         nama: "Yoga Permana",
//         email: "yoga@gmail.com",
//         telp: "081234567809",
//       },
//       {
//         id: 10,
//         nama: "Putri Ayu",
//         email: "putri@gmail.com",
//         telp: "081234567810",
//       },
//       {
//         id: 11,
//         nama: "Fajar Hidayat",
//         email: "fajar@gmail.com",
//         telp: "081234567811",
//       },
//       {
//         id: 12,
//         nama: "Nisa Azzahra",
//         email: "nisa@gmail.com",
//         telp: "081234567812",
//       },
//       {
//         id: 13,
//         nama: "Andre Wijaya",
//         email: "andre@gmail.com",
//         telp: "081234567813",
//       },
//       {
//         id: 14,
//         nama: "Sarah Novita",
//         email: "sarah@gmail.com",
//         telp: "081234567814",
//       },
//       {
//         id: 15,
//         nama: "Reza Ramadhan",
//         email: "reza@gmail.com",
//         telp: "081234567815",
//       },
//     ],
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

var express = require("express");
var cors = require("cors");
var mysql = require("mysql2");

var app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // sesuaikan kalau ada password
  database: "stokin_simple"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Koneksi ke database gagal:", err.message);
  } else {
    console.log("✅ Berhasil terhubung ke MySQL");
  }
});


// GET semua user
app.get("/users", (req, res) => {
  const sql = "SELECT id, nama, email, telp FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Gagal ambil data",
        error: err.message
      });
    }

    res.json({
      status: true,
      data: result
    });
  });
});


// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server error"
      });
    }

    if (result.length > 0) {
      const user = result[0];

      res.json({
        status: true,
        message: "Login berhasil",
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          telp: user.telp
        }
      });
    } else {
      res.json({
        status: false,
        message: "Email atau password salah"
      });
    }
  });
});

app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});


