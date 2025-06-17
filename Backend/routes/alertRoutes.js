const express          = require('express');
const { handleAlert }  = require('../controllers/alertController');
const authMiddleware   = require('../middleware/authMiddleware');
const tenantMiddleware = require('../middleware/tenantMiddleware');

const router = express.Router();

// público: tracker envia alertas GEOFENCE_OUT/IN
router.get('/', handleAlert);

// histórico de alertas
router.get('/history',
  authMiddleware,
  tenantMiddleware,
  async (req, res) => {
    const Alert = require('../models/Alert');
    const alerts = await Alert.find({ tenantId: req.tenantId })
                              .sort({ timestamp: -1 })
                              .limit(100);
    res.json(alerts);
  }
);

module.exports = router;
