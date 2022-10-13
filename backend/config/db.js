import mongoose from 'mongoose'

// connect database


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB already connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(`${err.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB