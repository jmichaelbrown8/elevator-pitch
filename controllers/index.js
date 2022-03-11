const router = require('express').Router();

const renderWithAppData = require('../utils/renderWithAppData');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', renderWithAppData, homeRoutes);
router.use('/api', apiRoutes);

// 404 page fallback
router.use('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = router;
