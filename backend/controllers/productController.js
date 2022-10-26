import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@description: send request for all the products
//@route: Get /api/products
//@access: to public  
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error('No permission to access')
    res.json(products)
})

//@description: send request for one product
//@route: Get /api/products/:id
//@access: to public  
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product){
        // res.status(401)
        // throw new Error('No permission to access')
        res.json(product)
    } else {
        res.status(404)
        throw new Error('not found this product!')
    }
})

//@description: delete 
//@route: DELETE /api/products/:id
//@access: admin  
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product){
        // res.status(401)
        // throw new Error('No permission to access')
        await product.remove()
        res.json({message: 'Successfully delete this product.'})
    } else {
        res.status(404)
        throw new Error('not found this product!')
    }
})

//@description: create product 
//@route: POST /api/products
//@access: admin
const createProduct = asyncHandler(async(req, res) => {
    // create product
    const product = new Product({
        name: 'hey',
        price: 0,
        user: req.user._id,
        image: 'def',
        brand: 'app',
        category: 'p',
        countInStock: 0,
        numReviews: 0,
        description: 'nice',
        rating: 0
    })
    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

//@description: update product 
//@route: PUT /api/products
//@access: admin
const updateProduct = asyncHandler(async(req, res) => {
    // create product
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.numReviews = numReviews
        product.description = description
        const updateProduct = await product.save()
        res.status(201).json(updateProduct)
    } else {
        res.status(404).json('not found this product')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct}