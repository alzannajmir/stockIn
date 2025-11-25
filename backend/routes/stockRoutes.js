// backend/routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// --- Definisikan SEMUA route di sini ---

// Route untuk menambah stock baru
router.post("/", stockController.addStock);

// Route untuk mendapatkan semua stock
router.get("/", stockController.getAllStocks);

// Route untuk mendapatkan data laporan
router.get("/report", stockController.getStockReport);

// Route untuk menghapus stock berdasarkan ID
router.delete("/:id", stockController.deleteStock);

// Route untuk mengurangi stok
router.put("/:id/reduce", stockController.reduceStock);

// Route untuk menambah stok
router.put("/:id/increase", stockController.increaseStock);

// --- EKSPOR ROUTER HANYA SEKALI DI AKHIR FILE ---
module.exports = router;
