const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Item = require('../models/item');

// @desc    Get all items
// @route   GET /api/v1/items
// @access  Private
exports.getItems = asyncHandler(async (req, res, next) => {
    const items = await Item.find();

    res.status(200).json({ success: true, data: items });
});

// @desc    Get single item
// @route   GET /api/v1/items/:id
// @access  Private
exports.getItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return next(new ErrorResponse(`Item not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: item });
});

// @desc    Create new item
// @route   POST /api/v1/items
// @access  Private
exports.createItem = asyncHandler(async (req, res, next) => {
    // Add owner
    req.body.owner = req.user.id;
    // Add member
    req.body.members = req.user.email;

    const item = await Item.create(req.body);

    res.status(201).json({
        success: true,
        data: item
    });
});

// @desc    Update item
// @route   PUT /api/v1/items/:id
// @access  Private
exports.updateItem = asyncHandler(async (req, res, next) => {
    let item = await Item.findById(req.params.id);

    if (!item) {
        return next(new ErrorResponse(`Item not found with id ${req.params.id}`, 404));
    }

    // Check ownership
    if (item.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} not authorized to update item`, 401));
    }

    if (req.body.members == null) {
        item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } else {
        item = await Item.findByIdAndUpdate(req.params.id, { $addToSet: {members: req.body.members} }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    res.status(200).json({ success: true, data: item });
});

// @desc    Delete item
// @route   DELETE /api/v1/items/:id
// @access  Private
exports.deleteItem = asyncHandler(async (req, res, next) => {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
        return next(new ErrorResponse(`Item not found with id ${req.params.id}`, 404));
    }

    // Check ownership
    if (item.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.id} not authorized to delete item`, 401));
    }

    res.status(200).json({ success: true, data: {} });
});