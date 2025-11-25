// backend/controllers/stockController.js
const db = require("../db");

// Fungsi untuk menambah stock baru (CREATE)
exports.addStock = (req, res) => {
  const { kode_barang, nama_barang, jumlah_stok, merk } = req.body;
  const tanggal_masuk = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini

  const query =
    "INSERT INTO stocks (kode_barang, nama_barang, jumlah_stok, merk, tanggal_masuk) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [kode_barang, nama_barang, jumlah_stok, merk, tanggal_masuk],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal menambah stock" });
      }
      res.status(201).json({
        message: "Stock berhasil ditambahkan",
        data: { id: result.insertId, ...req.body },
      });
    }
  );
};

exports.deleteStock = (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL

  const query = "DELETE FROM stocks WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menghapus stock" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Stock tidak ditemukan" });
    }

    res.status(200).json({ message: "Stock berhasil dihapus" });
  });
};

// backend/controllers/stockController.js
// ... fungsi yang sudah ada ...

// Fungsi untuk menambah stok (UPDATE)
exports.increaseStock = (req, res) => {
  const { id } = req.params; // ID barang
  const { quantity } = req.body; // Jumlah yang akan ditambahkan

  if (!quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Jumlah yang ditambahkan harus lebih dari 0" });
  }

  // Query untuk menambah stok
  const query = "UPDATE stocks SET jumlah_stok = jumlah_stok + ? WHERE id = ?";

  db.query(query, [quantity, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menambah stok" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.status(200).json({ message: "Stok berhasil ditambahkan" });
  });
};

// Fungsi untuk mendapatkan semua stock (READ)
exports.getAllStocks = (req, res) => {
  const query = "SELECT * FROM stocks ORDER BY tanggal_masuk DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data stock" });
    }
    res.status(200).json(results);
  });
};

// backend/controllers/stockController.js
// ... fungsi yang sudah ada ...

// Fungsi untuk mendapatkan data laporan (total stok per merk)
exports.getStockReport = (req, res) => {
  // Query untuk mengelompokkan stok berdasarkan merk dan menjumlahkannya
  const query = `
    SELECT 
      COALESCE(merk, 'Tanpa Merk') as merk, 
      SUM(jumlah_stok) as total_stok 
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

// Fungsi untuk mengurangi stok (UPDATE)
exports.reduceStock = (req, res) => {
  const { id } = req.params; // ID barang
  const { quantity } = req.body; // Jumlah yang akan dikurangi

  if (!quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Jumlah yang dikurangi harus lebih dari 0" });
  }

  // Query untuk mengurangi stok sekaligus mendapatkan data stok lama
  const query =
    "UPDATE stocks SET jumlah_stok = jumlah_stok - ? WHERE id = ? AND jumlah_stok >= ?";

  db.query(query, [quantity, id, quantity], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengurangi stok" });
    }

    if (result.affectedRows === 0) {
      // Jika tidak ada baris yang terpengaruh, berarti stok tidak mencukupi atau ID tidak ditemukan
      return res
        .status(400)
        .json({ message: "Stok tidak mencukupi atau barang tidak ditemukan" });
    }

    res.status(200).json({ message: "Stok berhasil dikurangi" });
  });
};
