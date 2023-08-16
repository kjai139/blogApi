const User = require('../models/userModel')
const { body, validationResult} = require('express-validator')
const debug = require('debug')('blogApi:usersController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config()

const domain = process.env.FRONTEND_DOMAIN || 'localhost'

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
                message:'The username already exists',
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

exports.users_login_post = async (req, res) => {
    const userName = req.body.userName.toLowerCase()
    const userPassword = req.body.userPassword
    try {
        const user = await User.findOne({
            normalized_name: userName
        })

        if (!user) {
            debug('userLogin: username does not exist')
            return res.json({
                message: 'username does not exist'
            })
        }
        const passwordsMatch = await bcrypt.compare(userPassword, user.password)

        if (passwordsMatch) {
            const token = jwt.sign({
                id: user._id,
                username: user.name,
                normalized_name: user.normalized_name,
                user_status: user.user_status
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1hr'
            })

            

            //storing jwt in http-only cookie method
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000,
                domain: 'blog-api-gilt-ten.vercel.app',
                
                path: '/'
            })
            debug('token sent via httponly cookie')
            res.json({
                message: 'Login successful'
            })
        } else {
            res.json({
                message: 'Password was incorrect'
            })
        }


    }catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

exports.users_login_get = (req, res) => {
    const token = req.cookies.jwt
    debug(token, 'req cookies', req.cookies)

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const {id, username, normalized_name, user_status} = decodedToken

        res.json({
            id: id,
            username: username,
            normalized_name: normalized_name,
            user_status, user_status,
            logged_in: true
        })
    } catch (err) {
        res.json({
            logged_in: false,
            message: `${err}, ${token}`
        })
    }
}

exports.user_logout_post= (req, res) => {
    debug('logging user out...')
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            maxAge: -1,
            domain: domain,
            path: '/',
            
    
    
            
        })
        res.json({
            message: 'User has successfully logged out',
            success:true
        })
    } catch(err) {
        res.status(500).json({
            message:err
        })
    }
    
}