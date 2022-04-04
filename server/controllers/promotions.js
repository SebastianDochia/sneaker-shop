const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Promotion = require('../models/Promotion');

// @desc    Get all Promotions
// @route   GET /api/v1/Promotions
// @access  Private
exports.getPromotions = asyncHandler(async (req, res, next) => {
    const promotion = await Promotion.find();

    res.status(200).json({ success: true, data: promotion });
});