const express = require('express');
const { getPromotions } = require("../controllers/promotions");

const router = express.Router();

router.route('/').get(getPromotions);

module.exports = router;