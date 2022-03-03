const router = require('express').Router();
const { Idea } = require('../../models');

// Input:   id (idea id)
// Output:  JSON Object containing idea data
router.get('/:id', async (req, res) => {
  try {
    const ideaData = await Idea.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ ideaData });
  } catch (err) {
    let message = 'Something went wrong.';
    console.log(err);
    res.status(400).json({
      message,
      err,
    });
  }
});

// Input:   name (creator), user_id, space_id (UUID optional), pitch (text)
// Creates a new idea
router.post('/', async (req, res) => {
  try {
    await Idea.create(req.body);
    res.status(200).json({
      message: `Idea created`,
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
