const router = require('express').Router();
const { Interest } = require('../../models');
const { withAuthJson } = require('../../utils/auth');

// Input:   req.session.user_id and param for idea_id
// Output:  boolean to indicate if the user has already shown interest or not
router.get('/', async (req, res) => {
  try {
    const interestData = await Interest.findAll({
      attributes: ['user_id'],
      where: {
        idea_id: req.query.idea_id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json({
      interested: interestData.length ? true : false,
    });
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
router.post('/', withAuthJson, async (req, res) => {
  try {
    // only add interest if it doesn't already exist
    const existingInterest = await Interest.findAll({
      where: [
        {
          idea_id: req.body.idea_id,
          user_id: req.session.user_id,
        },
      ],
    });

    console.log(existingInterest);
    if (!existingInterest.length) {
      // Create interest if it doesn't exist
      await Interest.create({
        idea_id: req.body.idea_id,
        user_id: req.session.user_id,
      });
      res.status(200).json({ interested: true });
    } else {
      // else remove interest
      await Interest.destroy({
        where: {
          id: existingInterest[0].id,
        },
      });
      res.status(200).json({ interested: false });
    }
  } catch (err) {
    let message = 'Something went wrong.';

    res.status(400).json({
      message,
      err,
    });
  }
});

module.exports = router;
