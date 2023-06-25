const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Lấy danh sách các hóa đơn
router.get("/orders", (req, res) => {
  Order.find()
    .populate("table", "number")
    .populate("items.food", "name price")
    .then((orders) => res.json(orders))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Lấy thông tin chi tiết một hóa đơn
router.get("/orders/:id", (req, res) => {
  Order.findById(req.params.id)
    .populate("table", "number")
    .populate("items.food", "name price")
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Thêm một hóa đơn mới
router.post("/orders", (req, res) => {
  const newOrder = new Order({
    table: req.body.table,
    items: req.body.items,
    total: req.body.total,
  });

  newOrder
    .save()
    .then(() => res.json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
