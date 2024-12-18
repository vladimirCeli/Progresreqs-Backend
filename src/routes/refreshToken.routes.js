const {Router} = require('express')
const { handleRefreshToken } = require('../controllers/refreshToken.controllers')
const rateLimit = require('express-rate-limit')

// Create a rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
})

const router = Router()

router.get('/refresh', limiter, handleRefreshToken )



module.exports = router