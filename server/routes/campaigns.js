const express = require("express");
const {
  getCampaigns,
  addCampaign,
  deleteCampaign,
  editCampaign,
} = require("../controllers/campaigns.js");
const router = express.Router();

router.get("/", getCampaigns);
router.post("/addCampaign", addCampaign);
router.post("/deleteCampaign/:id", deleteCampaign);
router.post("/editCampaign/:id/:onOff", editCampaign);

module.exports = router;
