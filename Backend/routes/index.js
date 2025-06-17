const express      = require('express');
const authRoutes   = require('./authRoutes');
const tenantRoutes = require('./tenantRoutes');
const deviceRoutes = require('./deviceRoutes');
const trackRoutes  = require('./trackRoutes');
const alertRoutes  = require('./alertRoutes');

const router = express.Router();

router.use('/auth',   authRoutes);
router.use('/tenants',tenantRoutes);
router.use('/devices',deviceRoutes);
router.use('/track',  trackRoutes);
router.use('/alert',  alertRoutes);

module.exports = router;
