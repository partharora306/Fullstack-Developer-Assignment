const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const campaignRoutes = require("./routes/campaigns.js");
const campaignsListRoutes = require("./routes/campaigns_list.js");
const productsListRoutes = require("./routes/products_list.js");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extends: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extends: true }));
app.use(cors());

app.use("/", campaignRoutes);
app.use("/", campaignsListRoutes);
app.use("/", productsListRoutes);

const uri =
  "mongodb+srv://root:root@cluster0.9gwkj.mongodb.net/test?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
