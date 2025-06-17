const express          = require('express');
const { createDevice, listDevices } = require('../controllers/deviceController');
const authMiddleware   = require('../middleware/authMiddleware');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const roleMiddleware   = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware, tenantMiddleware);

router.post('/', roleMiddleware('admin'), createDevice);
router.get('/', listDevices);

module.exports = router;
