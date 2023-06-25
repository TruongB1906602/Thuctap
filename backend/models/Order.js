const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: {
    type: Number,
    ref: "Table",
     required: true,
  },
  items: [
    {
      product:[ 
        {
          name:{
            type: String,
            
          }
       }
      ],
      quantity: {
        type: Number,
         required: true,
      },
    },
  ],
  total: {
    type: Number,
    // required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
