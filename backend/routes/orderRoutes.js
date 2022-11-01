import express from 'express'
import {
    addOrderItems, 
    getOrderById, 
    getOrders,
    getOrdersDetails,
    updateOrderToPaid
} from '../controllers/orderController.js'
import { 
    protect,
    admin 
} from '../middleware/authMiddleware.js'
const router = express.Router()
  
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:userId/all').get(protect, getOrdersDetails)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router