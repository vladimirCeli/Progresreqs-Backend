const { Router } = require("express");
const RateLimit = require("express-rate-limit");
const {
  getAllQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaireByIdInPublishedOrUnpublished,
  updateQuestionnaireByIdSteps,
  getAdditionalQuestionnaires,
  selectAdditionalQuestionnaire,
  getQuestionnairePublished,
  getQuestionnaireComplete,
  createQuestionnaire,
  updateQuestionnaireById,
  deleteQuestionnaireById,
} = require("../../controllers/questionnaire/questionnaire.controllers");
const RateLimit = require('express-rate-limit');

const router = Router();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.get("/questionnaire",limiter, getAllQuestionnaires);

router.get("/questionnaire/complete/:id",limiter, getQuestionnaireComplete);

router.get("/questionnaire/published/:project_id",limiter, getQuestionnairePublished);

router.put(
  "/questionnaire/editpublished/:id",
  limiter,
  updateQuestionnaireByIdInPublishedOrUnpublished
);

router.get("/questionnaire/additional/:project_id",limiter, getAdditionalQuestionnaires);

router.post("/questionnaire/add/:projectId",limiter, selectAdditionalQuestionnaire);

router.put("/questionnaire/editsteps/:id",limiter, updateQuestionnaireByIdSteps);

router.post("/questionnaire",limiter, createQuestionnaire);

router.delete("/questionnaire/:id", limiter, deleteQuestionnaireById);

router.put("/questionnaire/:id",limiter, updateQuestionnaireById);

router.get("/questionnaire/:id", limiter, getQuestionnaireById);

module.exports = router;
