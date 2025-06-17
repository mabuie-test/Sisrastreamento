const express          = require('express');
const { createTrack, getHistory } = require('../controllers/trackController');
const authMiddleware   = require('../middleware/authMiddleware');
const tenantMiddleware = require('../middleware/tenantMiddleware');

const router = express.Router();

// público: tracker envia dados
router.get('/', createTrack);

// histórico protegido
router.get('/history', authMiddleware, tenantMiddleware, getHistory);

module.exports = router;
