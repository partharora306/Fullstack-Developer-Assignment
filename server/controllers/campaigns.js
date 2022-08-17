const Campaign = require("../models/campaigns.js");
const CampaignList = require("../models/campaigns_list.js");
const ProductsList = require("../models/products_list.js");
var moment = require("moment");

module.exports.getCampaigns = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params)
  try {
    const campaigns = await Campaign.find();
    console.log(campaigns);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.addCampaign = async (req, res) => {
  console.log(req.params);
  console.log(req.data);
  console.log(req.body);
  try {
    if (req.body != undefined && req.body != null) {
      const campaign_data = await CampaignList.find({
        _id: req.body.campaignId,
      });
      console.log(campaign_data[0]);

      const product_data = await ProductsList.find({ _id: req.body.productId });
      console.log(product_data[0]);
      console.log("inserttion started");

      let DataForInsert = {
        Campaign_name: product_data[0].Product_name,
        Campaign_image: product_data[0].Product_img,
        Campaign_on: true,
        Start_date: req.body.start_date,
        End_date: req.body.end_date,
        Loc: req.body.loc,
        Platform: campaign_data[0].Platform,
        Created_on: moment().format("DD MM YYYY"),
      };

      console.log(DataForInsert);
      const newComapignData = new Campaign(DataForInsert);
      const insertCampaign = await newComapignData.save();
      console.log(insertCampaign);
      console.log("insertedCampaign");
      res.status(200).json(insertCampaign);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteCampaign = await Campaign.findByIdAndDelete(id);
    console.log(deleteCampaign);
    res.status(200).json(deleteCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.editCampaign = async (req, res) => {
  const { id } = req.params;
  const { onOff } = req.params;
  console.log(id);
  console.log(onOff);
  try {
    const editCampaign = await Campaign.findByIdAndUpdate(id, {
      Campaign_on: onOff,
    });
    console.log("editCampaign");
    res.status(200).json(editCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
