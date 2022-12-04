import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token  --Login Section
// @route   POST /api/users/login
// @access  Public
let count=0
const authUser = asyncHandler(async (req, res) => {
	
	const { email, password } = req.body

	const user = await User.findOne({ email })
	
	if(!user)
	{   
		res.status(400)
		throw new Error('Invalid Username')
	   
	}
	let correctPassword=await user.matchPassword(password)
	if (user && correctPassword ) {
		
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} 
	if(user && !correctPassword )
	{
		res.status(401)
		throw new Error('Invalid Password')
	}  

	
		
})
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	let count=1
	let blockedTime=""
	let blocked=false

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}
	
	const user = await User.create({
		name,
		email,
		password,
		blockedTime,
		blocked,
		count
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			blockedTime:user.blockedTime,
			blocked:user.blocked,
			count,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const { email } = req.body
	const user = await User.findOne({email})
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			blockedTime:user.blockedTime,
			count:user.count,
			blocked:user.blocked
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})

const updateUserProfile = asyncHandler(async (req, res) => {
	const { email,count,blocked,blockedTime } = req.body
	const user = await User.findOne({email})
	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.count=req.body.count
		user.blocked=req.body.blocked
		user.blockedTime=req.body.blockedTime
		if (req.body.password) {
			user.password = req.body.password
		}
		
		const updatedUser = await user.save()

		res.send({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			count:updatedUser.count,
			blocked:updatedUser.blocked,
			blockedTime:updatedUser.blockedTime,
			
		})
	} else {
		res.status(404)
		throw new Error('User Not Found')
	}
})

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
}
