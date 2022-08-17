const Products_list = require("../models/products_list.js");

module.exports.getProductsList = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params)
  try {
    const products_list = await Products_list.find();
    console.log(products_list);
    res.status(200).json(products_list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
