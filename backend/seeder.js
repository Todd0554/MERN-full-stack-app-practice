
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

// add example data to mongoDB 
const importData = async () => {
    try {
        // clear example data in database, similar to initializing the database
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        // insert the example users
        const createdUsers = await User.insertMany(users)

        // get admin user id and add each product a owner(admin user)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })
        // insert example products (including admin user as owner)
        await Product.insertMany(sampleProducts)
        console.log('successfully inserting example data of users and products'.green.inverse)
        process.exit()
    }catch(e) {
        console.log(`${e.message}`.red.bold.inverse)
        process.exit(1)
    }
}


// destroy example data to mongoDB 
const destroyData = async () => {
    try {
        // clear example data in database, similar to initializing the database
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('successfully destroying example data of users and products'.green.inverse)
        process.exit()
    }catch(e) {
        console.log(`${e.message}`.red.bold.inverse)
        process.exit(1)
    }
}

// check the command from terminal, and then determine which one should be executed, importing or destroying
process.argv[2] === '-d' ? destroyData() : importData()