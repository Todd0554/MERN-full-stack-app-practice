import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 4000
const HOST = '0.0.0.0'

void process.on('unhandledRejection', (reason, p) => {
    console.log(`Here is the BIG ERROR: \n`.red + p)
    console.log(`That's because of: \n`.red + reason)
})

const app = express()
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}))

app.use(express.json())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(express.urlencoded({extended: true}))

// configure cors
var corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// upload folder used as static files folder 
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '/frontend/build/index.html'));
    })
} else {
    app.get('/', (req,res) => {
        res.send('Server is running...')
    })
}

app.use(notFound)
app.use(errorHandler)



app.listen(
    PORT, 
    HOST,
    console.log(`   Server is running in ${process.env.NODE_ENV} 
    HOST: ${HOST}
    PORT: ${PORT}...`.yellow.bold)
)