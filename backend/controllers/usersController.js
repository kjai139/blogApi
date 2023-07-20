const User = require('../models/userModel')
const { body, validationResult} = require('express-validator')
const debug = require('debug')('blogApi:usersController')
const bcrypt = require('bcrypt')



exports.create_user_post = [
    body('userName')
    .trim()
    .isLength({min: 1}).withMessage('Username must not be blank')
    .matches(/^[a-zA-Z0-9]/).withMessage('Username must not contain symbols')
    .escape(),
    body('userPassword')
    .isLength({min:6}).withMessage('Password must have at least 6 characters')
    .matches(/^(?=.*[a-z])/).withMessage('Password must have at least one lowercase letter')
    .matches(/^(?=.*[A-Z])/).withMessage('Password must have at least one uppercase letter')
    .matches(/^(?=.*[!@#$%^&()_+-])/).withMessage('Password must contain at least one symbol'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            debug('errors validating in create user')
            return res.status(400).json({
                message: errors.array()
            })
        } else {
            debug('no errors validating in create user')
            try {
                const {userName, userPassword} = req.body
                const salt = await bcrypt.genSalt(10)
                const hashedPw = await bcrypt.hash(userPassword, salt)
                const normalizedName = userName.toLowerCase()

                const newUser = new User({
                    name: userName,
                    normalized_name: normalizedName,
                    password: hashedPw
                })

                await newUser.save()
                res.json({
                    success:true,
                    message: 'User has successfully registered'
                })



            } catch(err) {
                if (err.code === 11000) {
                    res.status(400).json({
                        message: 'User already exists'
                    })
                } else {
                    res.status(500).json({
                        message:`${err}`
                    })
                }
            }
        }
    }
]

exports.users_create_check = async (req, res) => {
    const userName = req.query.username
    debug('req query', req.query)
    try {
        const response = await User.findOne({normalized_name: userName})
        debug(response)
        if (response) {
            res.json({
                message:'User already exists',
                success: false
            })
        } else {
            res.json({
                success:true
            })
        }
    } catch (err) {
        res.json({
            message:err
        })
    }
}