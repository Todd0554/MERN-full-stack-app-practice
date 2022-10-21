import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


//@description: user authentication & get token
//@route: POST /api/users/login
//@access: to public  
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

//@description: when successfully sign in, the user's information wil be shown in this page
//@route: GET /api/users/profile
//@access: private  
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('No user found.')
    }
})

//@description: sign up a new user
//@route: POST /api/users
//@access: to public  
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already existed.')
    }
    const user = await User.create({name, email, password})
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("User is not existed")
    }
})

//@description: update user information
//@route: PUT /api/users/profile
//@access: private  
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    // get new user information
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
          }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('No user found.')
    }
})
export {authUser, getUserProfile, registerUser, updateUserProfile}