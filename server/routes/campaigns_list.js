const express = require("express");
const { getCampaignsList } = require("../controllers/campaigns_list.js");
const router = express.Router();

router.get("/campaignsList", getCampaignsList);

module.exports = router;
