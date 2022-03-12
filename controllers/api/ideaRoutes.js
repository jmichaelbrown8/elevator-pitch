const router = require('express').Router();
const { Idea } = require('../../models');
const { withApprovedMembership, withAuthJson } = require('../../utils/auth');

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
router.post(
  '/:space_id',
  withApprovedMembership,
  withAuthJson,
  async (req, res) => {
    try {
      const idea = await Idea.create(req.body);
      const myIdea = idea.toJSON();
      res.status(200).json(myIdea);
    } catch (err) {
      let message = 'Something went wrong.';
      console.log(err);
      res.status(400).json({
        message,
        err,
      });
    }
  }
);

module.exports = router;
