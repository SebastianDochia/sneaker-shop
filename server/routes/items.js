const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/items");

const router = express.Router();

router.route('/').post(createItem).get(getItems);

router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;