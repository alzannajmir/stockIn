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
// backend/index.js
require("dotenv").config(); // Load variabel dari .env
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Izinkan request dari frontend
app.use(express.json()); // Izinkan server menerima JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes); // Semua route di authRoutes akan diakses dengan prefix /api/auth

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
