const express = require('express');
const router = express.Router();
const detailsRoutes = require('./detailsRoutes');
const relatoriosRoutes = require('./relatoriosRoutes');

router.use('/details', detailsRoutes);
router.use('/relatorios', relatoriosRoutes);

module.exports = router;

