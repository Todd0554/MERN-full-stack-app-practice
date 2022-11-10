import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch (err) {
            res.status(401)
            throw new Error('Haven\'been authorized, token is invalid.')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Haven\'been authorized, no token was provided.')
    }
})

const admin = asyncHandler(async(req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res(401)
        throw new Error('You are not authorized to these data.')
    }
})

export { protect, admin }