const {Router} = require('express')
const RateLimit = require("express-rate-limit");

const { getAllQuestions,
    getAllQuestionsComplete,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion } = require('../../controllers/questionnaire/question.controllers')

const router = Router()

const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
  });

router.get('/question',limiter, getAllQuestions )

router.get('/question/complete',limiter, getAllQuestionsComplete )

router.get('/question/:id',limiter, getQuestion )

router.post('/question',limiter, createQuestion )

router.delete('/question/:id',limiter, deleteQuestion )

router.put('/question/:id',limiter, updateQuestion )

module.exports = router




