const router = require('express').Router();
const { IdeaUpvote } = require('../../models');
const { withAuthJson } = require('../../utils/auth');

// Input: req.session.user_id and param for idea_id
// Output: boolean to indicate if user has already upvoted idea
router.get('/', async (req, res) => {
  try {
    const ideaUpvoteData = await IdeaUpvote.findAll({
      attributes: ['user_id'],

      where: {
        idea_id: req.query.idea_id,
        user_id: req.session.user_id,
      },
    });
    console.log('1', ideaUpvoteData)
    res.status(200).json({
      upvoted: ideaUpvoteData.length ? true : false,
    });
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

//  Input: idea_id, user_id
// Creates a new upvote relation between user and idea.
router.post('/', withAuthJson, async (req, res) => {
  try {
    await IdeaUpvote.create({
      idea_id: req.body.idea_id,
      user_id: req.session.user_id,
    });
    console.log('2', upvoted)
    res.status(200).json({ upvoted: true });
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

// Removes upvote from the idea from the user.  
router.delete('/', async (req, res) => {
  try {
    await IdeaUpvote.destroy({
      where: {
        idea_id: req.body.idea_id,
        user_id: req.session.user_id,
      },
    });
    console.log('3', upvoted)
    res.status(200).json({ upvoted: false });
  } catch (err) {

    let message = 'Something went wrong.';
    res.status(400).json({
      message,
      err,
    });
  }
});

module.exports = router;
