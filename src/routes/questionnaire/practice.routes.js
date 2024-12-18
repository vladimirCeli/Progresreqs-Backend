const {Router} = require('express')
const {  getAllPractices,
    getPracticeById,
    createPractice,
    updatePracticeById,
    deletePracticeById, } = require('../../controllers/questionnaire/practice.controllers')
const rateLimit = require('express-rate-limit');

const router = Router()

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

router.get('/subsection', limiter, getAllPractices )

router.get('/subsection/:id', limiter, getPracticeById )

router.post('/subsection', limiter, createPractice )

router.delete('/subsection/:id', limiter, deletePracticeById )

router.put('/subsection/:id', limiter, updatePracticeById )

module.exports = router
