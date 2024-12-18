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

const router = Router();

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.get("/questionnaire", getAllQuestionnaires);

router.get("/questionnaire/complete/:id", getQuestionnaireComplete);

router.get("/questionnaire/published/:project_id", getQuestionnairePublished);

router.put(
  "/questionnaire/editpublished/:id",
  updateQuestionnaireByIdInPublishedOrUnpublished
);

router.get("/questionnaire/additional/:project_id", getAdditionalQuestionnaires);

router.post("/questionnaire/add/:projectId", selectAdditionalQuestionnaire);

router.put("/questionnaire/editsteps/:id", updateQuestionnaireByIdSteps);

router.post("/questionnaire", createQuestionnaire);

router.delete("/questionnaire/:id", limiter, deleteQuestionnaireById);

router.put("/questionnaire/:id", updateQuestionnaireById);

router.get("/questionnaire/:id", getQuestionnaireById);

module.exports = router;
