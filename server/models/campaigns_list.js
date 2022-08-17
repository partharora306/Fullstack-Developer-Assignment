const mongoose = require("mongoose");

const campaignsListSchema = mongoose.Schema({
  Campaign_name: { type: String, required: true },
  Campaign_icon: { type: String, required: true },
  Platform: { type: String, required: true },
});

const campaigns_list = mongoose.model("Campaigns_list", campaignsListSchema);

module.exports = campaigns_list;
