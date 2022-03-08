const router = require('express').Router();
const userRoutes = require('./userRoutes');
const spaceRoutes = require('./spaceRoutes');
const spaceMemberRoutes = require('./spaceMemberRoutes');
const ideaRoutes = require('./ideaRoutes');
const interestRoutes = require('./interestRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/space', spaceRoutes, spaceMemberRoutes);
router.use('/idea', ideaRoutes);
router.use('/interest', interestRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
