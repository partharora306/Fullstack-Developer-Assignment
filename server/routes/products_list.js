const express = require("express");
const { getProductsList } = require("../controllers/products_list.js");
const router = express.Router();

router.get("/productsList", getProductsList);

module.exports = router;
