import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'


dotenv.config()

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
const PORT = process.env.PORT || 4000

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} port ${PORT}...`)
)