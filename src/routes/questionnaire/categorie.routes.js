const {Router} = require('express')

const {   getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById, } = require('../../controllers/questionnaire/categorie.controllers')

const router = Router()

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

router.get('/categorie', rateLimiter, getAllCategories )

router.get('/categorie/:id', rateLimiter, getCategoryById )

router.post('/categorie', rateLimiter, createCategory )

router.delete('/categorie/:id', rateLimiter, deleteCategoryById )

router.put('/categorie/:id', rateLimiter, updateCategoryById )

module.exports = router