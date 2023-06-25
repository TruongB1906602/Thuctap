const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Còn trống"

  },
  
});

module.exports = mongoose.model("Table", tableSchema);
