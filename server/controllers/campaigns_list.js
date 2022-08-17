const Campaigns_list = require("../models/campaigns_list.js");

module.exports.getCampaignsList = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params)
  try {
    const campaigns_list = await Campaigns_list.find();
    console.log(campaigns_list);
    res.status(200).json(campaigns_list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
