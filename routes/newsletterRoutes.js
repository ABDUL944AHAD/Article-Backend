const express = require("express");
const newsletterController = require('../controller/newsletterController')
const router = express.Router();

router.post("/subscribe", newsletterController.subscribe);
// router.get("/subscribers", newsletterController.getSubscribers);

module.exports = router;
