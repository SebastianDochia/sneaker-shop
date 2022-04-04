const express = require('express');

const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} = require('../controllers/orders');

const router = express.Router();

router.route('/').post(addOrderItems).get(getOrders)
router.route('/myorders').get(getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/:id/deliver').put(updateOrderToDelivered)

module.exports = router
