const jwt = require('jsonwebtoken')
require('dotenv').config()
const debug = require('debug')('blogApi:authentication')

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decodedToken
        debug('user is logged in', req.user)
        next()
    } catch (err) {
        res.status(401).json({
            message: 'Invalid or expired token',
            
        })
    }

}

module.exports = isAuthenticated