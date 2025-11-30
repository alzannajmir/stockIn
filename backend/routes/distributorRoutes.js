// backend/routes/distributorRoutes.js
const express = require("express");
const router = express.Router();
const distributorController = require("../controllers/distributorController");

// Route untuk menambah distributor
router.post("/", distributorController.addDistributor);

// Route untuk mendapatkan semua distributor
router.get("/", distributorController.getAllDistributors);

// Route untuk memperbarui distributor
router.put("/:id", distributorController.updateDistributor);

// Route untuk menghapus distributor
router.delete("/:id", distributorController.deleteDistributor);

module.exports = router;
