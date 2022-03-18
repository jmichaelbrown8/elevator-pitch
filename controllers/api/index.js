const router = require('express').Router();
const userRoutes = require('./userRoutes');
const spaceRoutes = require('./spaceRoutes');
const spaceMemberRoutes = require('./spaceMemberRoutes');
const ideaRoutes = require('./ideaRoutes');
const interestRoutes = require('./interestRoutes');
const commentRoutes = require('./commentRoutes');
const ideaUpvoteRoutes = require('./ideaUpvoteRoutes');
const resourceRoutes = require('./resourceRoutes');

router.use('/user', userRoutes);
router.use('/space', spaceRoutes, spaceMemberRoutes, ideaRoutes, resourceRoutes, interestRoutes);
router.use('/comment', commentRoutes);
router.use('/upvote', ideaUpvoteRoutes);

module.exports = router;
