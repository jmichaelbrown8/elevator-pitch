const router = require('express').Router();
const { Comment } = require('../../models');

// Input:   idea_id
// Output:  JSON Object => commentData =>  Array containing every comment with the idea_id
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        idea_id: req.body.idea_id,
      },
    });

    res.status(200).json({ commentData });
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json({
      message: `Comment added`,
    });
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

module.exports = router;
