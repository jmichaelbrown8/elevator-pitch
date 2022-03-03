const router = require('express').Router();
const { Interest } = require('../../models');

// Input:   idea_id
// Output:  JSON Object => commentData =>  Array containing every comment about the idea
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
    await Interest.create(req.body);
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
