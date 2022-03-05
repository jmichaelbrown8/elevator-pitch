const router = require('express').Router();

const renderWithAppData = require('../utils/renderWithAppData');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', renderWithAppData, homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
