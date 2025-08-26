const express = require("express");
const { subscribe, getSubscribers } = require("../controller/newsletterController");

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);

module.exports = router;
