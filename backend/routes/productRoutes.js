import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@description: send request for all the products
//@route: Get /api/products
//@access: to public  
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error('No permission to access')
    res.json(products)
}))

//@description: send request for one product
//@route: Get /api/products/:id
//@access: to public  
router.get(
    '/:id', 
    asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product){
        // res.status(401)
        // throw new Error('No permission to access')
        res.json(product)
    } else {
        res.status(404)
        throw new Error('not found this product!')
    }
}))

export default router