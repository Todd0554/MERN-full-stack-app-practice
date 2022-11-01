import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//@description: create order
//@route: POST /api/orders
//@access: to private  
const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems, 
        postalAddress, 
        paymentMethod, 
        itemsPrice, 
        postalPrice, 
        totalPrice
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error(`No order found.`)
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            postalAddress, 
            paymentMethod, 
            itemsPrice, 
            postalPrice, 
            totalPrice
        })

    const createOrder = await order.save()
    res.status(201).json(createOrder)
    }
})

//@description: get order
//@route: GET /api/orders/:id
//@access: to private  
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
        )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('No order found.')
    }
})

const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({})
    if (orders && orders.length !== 0) {
        res.json(orders)
    } else {
        res.status(404)
        res.json({message: 'No orders found.'})
    }
})

const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        res.json({message: 'No order found.'})
    }
})

const getOrdersDetails = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.params.userId})
    if (orders && orders.length !== 0) {
        res.json(orders)
    } else {
        res.status(404)
        res.json({message: 'No orders found.'})
    }
})
export {addOrderItems, getOrderById, getOrders, updateOrderToPaid, getOrdersDetails}