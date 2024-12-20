const {Router} = require('express')
const RateLimit = require("express-rate-limit");
const { createResponse,
    getAllResponses,
    getResponseByProjectAndQuestionnaireId,
    getResponseById,
    updateResponseById,
    deleteResponseById } = require('../../controllers/questionnaire/response.controllers')

const router = Router()

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.get('/response',limiter, getAllResponses )

router.get('/response/project/:id/:id2',limiter, getResponseByProjectAndQuestionnaireId )

router.get('/response/:id',limiter, getResponseById )

router.post('/response',limiter, createResponse )

router.delete('/response/:id',limiter, deleteResponseById )

router.put('/response/:id',limiter, updateResponseById )

module.exports = router


