const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name of a product"],
        trim: true,
      
    },

    price:{
        type:Number,
        required: [true, "Please add a price for your product"],
        maxLength:[8, "Price can not exceed than 8 characters"],
    },
  
    images:{
        type: String,
        required:[true,"Please add a category of your product"],
    },
    Stock:{
        type: Number,
     
        maxLength: [3, "Stock can not exceed than 3 characters"],
    },
 
  user:{
      type: mongoose.Schema.ObjectId,
      ref:"User",
    //   required: true
  },
  createAt:{
      type:Date,
      default: Date.now()
  }
})

module.exports = mongoose.model("Product",productSchema);