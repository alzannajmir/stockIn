// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route untuk mendapatkan data laporan order
router.get("/report", orderController.getOrderReport);

module.exports = router;
