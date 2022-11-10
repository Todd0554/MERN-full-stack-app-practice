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
        name: 'name of the product',
        price: 0,
        user: req.user._id,
        image: 'path of the image',
        brand: 'brand of the product',
        category: 'category of the product',
        countInStock: 0,
        numReviews: 0,
        description: 'description of the product',
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

//@description: create product review
//@route: POST /api/products/:id/reviews
//@access: admin
const createProductReview = asyncHandler(async(req, res) => {
    // create product
    const {
        rating, 
        comment
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString()) 
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('You have already reviewed this product!')
        }
        // add new review
        const review = {
            name: req.user.name,
            rating: req.user.rating,
            comment: req.body.comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        await product.save()
        res.status(201).json({message: "Successfully add review."})
    } else {
        res.status(404).json('not found this product')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}