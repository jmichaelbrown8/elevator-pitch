const router = require('express').Router();
const { Interest } = require('../../models');

// Input:   idea_id
// Output:  JSON Array containing every user that is interested in the idea
router.get('/', async (req, res) => {
  try {
    const interestData = await Interest.findAll({
      attributes: ['user_id'],
      where: {
        idea_id: req.body.idea_id,
      },
    });

    res.status(200).json({ interestData });
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

// Input:   idea_id, user_id
// Creates a new interest relation between user and idea
router.post('/', async (req, res) => {
  try {
    await Interest.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json({
      message: `Interest created`,
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
