const express          = require('express');
const { createTenant, getTenants } = require('../controllers/tenantController');
const authMiddleware   = require('../middleware/authMiddleware');
const roleMiddleware   = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('super-admin'), createTenant);
router.get('/', authMiddleware, roleMiddleware('super-admin'), getTenants);

module.exports = router;
