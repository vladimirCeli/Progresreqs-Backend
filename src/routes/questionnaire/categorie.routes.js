const {Router} = require('express')
const RateLimit = require('express-rate-limit');
const {   getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById, } = require('../../controllers/questionnaire/categorie.controllers')

const router = Router()

const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

router.get('/categorie', limiter, getAllCategories )

router.get('/categorie/:id', limiter, getCategoryById )

router.post('/categorie', limiter, createCategory )

router.delete('/categorie/:id', limiter, deleteCategoryById )

router.put('/categorie/:id', limiter, updateCategoryById )

module.exports = router