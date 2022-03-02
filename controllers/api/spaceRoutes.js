const router = require('express').Router();
const { Space } = require('../../models');

// Input:   id (space UUID)
// Output:  JSON Object => spaceData => list of all ideas within the space
router.get('/', async (req, res) => {
  try {
    const spaceData = await Space.findAll({
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({ spaceData });
  } catch (err) {
    let message = 'Something went wrong.';
    console.log(err);
    res.status(400).json({
      message,
      err,
    });
  }
});

// Input:   name (Space), user_id (creator)
// Creates a new space
router.post('/', async (req, res) => {
  try {
    await Space.create(req.body);
    res.status(200).json({
      message: `Space created`,
    });
  } catch (err) {
    let message = 'Something went wrong.';
    console.log(err);
    res.status(400).json({
      message,
      err,
    });
  }
});

module.exports = router;
