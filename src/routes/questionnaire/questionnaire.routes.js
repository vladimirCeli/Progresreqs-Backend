const { Router } = require("express");
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

// Objeto en memoria para rastrear solicitudes
const requestLogs = {};

// Límite de solicitudes
const REQUEST_LIMIT = 100;
const WINDOW_TIME = 15 * 60 * 1000; // 15 minutos

// Middleware para limitar solicitudes
function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();

  // Si no hay registros para esta IP, inicializamos su contador
  if (!requestLogs[ip]) {
    requestLogs[ip] = [];
  }

  // Filtramos las solicitudes que ya están fuera del tiempo permitido
  requestLogs[ip] = requestLogs[ip].filter(timestamp => currentTime - timestamp < WINDOW_TIME);

  // Si el número de solicitudes excede el límite, respondemos con un 429
  if (requestLogs[ip].length >= REQUEST_LIMIT) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  // Agregamos el timestamp de la solicitud actual
  requestLogs[ip].push(currentTime);

  // Continuamos con el siguiente middleware o ruta
  next();
}

router.get("/questionnaire", rateLimiter, getAllQuestionnaires);
router.get("/questionnaire/complete/:id", rateLimiter, getQuestionnaireComplete);
router.get("/questionnaire/published/:project_id", rateLimiter, getQuestionnairePublished);
router.put("/questionnaire/editpublished/:id", rateLimiter, updateQuestionnaireByIdInPublishedOrUnpublished);
router.get("/questionnaire/additional/:project_id", rateLimiter, getAdditionalQuestionnaires);
router.post("/questionnaire/add/:projectId", rateLimiter, selectAdditionalQuestionnaire);
router.put("/questionnaire/editsteps/:id", rateLimiter, updateQuestionnaireByIdSteps);
router.post("/questionnaire", rateLimiter, createQuestionnaire);
router.delete("/questionnaire/:id", rateLimiter, deleteQuestionnaireById);
router.put("/questionnaire/:id", rateLimiter, updateQuestionnaireById);
router.get("/questionnaire/:id", rateLimiter, getQuestionnaireById);

module.exports = router;