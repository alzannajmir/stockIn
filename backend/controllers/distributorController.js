// backend/controllers/distributorController.js
const db = require("../db");

// Fungsi untuk menambah distributor (CREATE)
exports.addDistributor = (req, res) => {
  const { nama_distributor, merk_barang, nomor_telepon } = req.body;

  const query =
    "INSERT INTO distributors (nama_distributor, merk_barang, nomor_telepon) VALUES (?, ?, ?)";

  db.query(
    query,
    [nama_distributor, merk_barang, nomor_telepon],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal menambah distributor" });
      }
      res.status(201).json({
        message: "Distributor berhasil ditambahkan",
        data: { id: result.insertId, ...req.body },
      });
    }
  );
};

// Fungsi untuk mendapatkan semua distributor (READ)
exports.getAllDistributors = (req, res) => {
  const query = "SELECT * FROM distributors ORDER BY nama_distributor ASC";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data distributor" });
    }
    res.status(200).json(results);
  });
};

// Fungsi untuk memperbarui distributor (UPDATE)
exports.updateDistributor = (req, res) => {
  const { id } = req.params;
  const { nama_distributor, merk_barang, nomor_telepon } = req.body;

  const query =
    "UPDATE distributors SET nama_distributor = ?, merk_barang = ?, nomor_telepon = ? WHERE id = ?";

  db.query(
    query,
    [nama_distributor, merk_barang, nomor_telepon, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Gagal memperbarui distributor" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Distributor tidak ditemukan" });
      }
      res.status(200).json({ message: "Distributor berhasil diperbarui" });
    }
  );
};

// Fungsi untuk menghapus distributor (DELETE)
exports.deleteDistributor = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM distributors WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menghapus distributor" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Distributor tidak ditemukan" });
    }
    res.status(200).json({ message: "Distributor berhasil dihapus" });
  });
};
