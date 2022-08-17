const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
  Campaign_name: { type: String, required: true },
  Campaign_image: { type: String, required: true },
  Campaign_on: { type: Boolean, required: true },
  Start_date: { type: String, required: true },
  End_date: { type: String, required: true },
  Loc: { type: String, required: true },
  Platform: { type: String, required: true },
  Created_on: { type: String, required: true },
});

const campaigns = mongoose.model("Campaign", campaignSchema);

module.exports = campaigns;
