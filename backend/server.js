const express = require('express')
const products = require('./data/products')

const app = express()

app.get('/', (req,res) => {
    res.send('Server is running...')
})

app.get('/api/products', (req,res) => {
    
    res.json(products)
})

app.get('/api/product/:id', (req,res) => {
    const product = products.find((product) => product._id = req.params.id)
    res.json(product)
})
// app.get('/', (req,res) => {
//     res.send('Server is running...')
// })

app.listen(4000, console.log('Server is running in port 4000...'))