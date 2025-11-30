// backend/controllers/orderController.js
const db = require("../db");

// Fungsi untuk mendapatkan laporan order per hari
exports.getOrderReport = (req, res) => {
  // Query untuk mengelompokkan total barang keluar per hari
  const query = `
    SELECT 
      COALESCE(merk, 'Tanpa Merk') as merk, 
      SUM(quantity) as total_stok 
    FROM stocks 
    GROUP BY merk
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data laporan" });
    }
    res.status(200).json(results);
  });
};

// Fungsi untuk mendapatkan data laporan order per hari (YANG BENAR)
exports.getOrderReport = (req, res) => {
  // Query untuk mengelompokkan total barang keluar per hari
  const query = `
    SELECT 
      DATE(tanggal_keluar) as tanggal, 
      SUM(quantity) as total_keluar 
    FROM stock_out_logs 
    GROUP BY DATE(tanggal_keluar)
    ORDER BY tanggal DESC
    LIMIT 30
  `; // Komentar JavaScript dihapus, query SQL sudah bersih

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data laporan order" });
    }
    res.status(200).json(results);
  });
};
