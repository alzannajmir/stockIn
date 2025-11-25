// backend/controllers/authController.js
const db = require("../db");
const bcrypt = require("bcryptjs");

// Fungsi untuk Registrasi
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Validasi input sederhana
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  // Cek apakah email sudah terdaftar
  const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Enkripsi password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Simpan user baru ke database
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, email, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Gagal mendaftarkan user" });
      }
      res.status(201).json({ message: "User berhasil didaftarkan" });
    });
  });
};

// Fungsi untuk Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  const findUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(findUserQuery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Login berhasil (untuk sekarang kita kirim data user, nanti bisa diganti JWT)
    res.status(200).json({
      message: "Login berhasil",
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
};
