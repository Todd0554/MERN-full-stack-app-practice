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

export {addOrderItems, getOrderById}