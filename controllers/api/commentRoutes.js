const router = require('express').Router();
const { Comment } = require('../../models');

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
