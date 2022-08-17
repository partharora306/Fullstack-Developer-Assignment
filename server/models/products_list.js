const mongoose = require("mongoose");

const productsListSchema = mongoose.Schema({
  Product_name: { type: String, required: true },
  Product_img: { type: String, required: true },
  Product_price: { type: String, required: true },
});

const products_list = mongoose.model("Products_list", productsListSchema);

module.exports = products_list;
