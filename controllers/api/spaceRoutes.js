const router = require('express').Router();
const { Space } = require('../../models');
const { withAuthJson } = require('../../utils/auth');

// Input:   id (space UUID)
// Output:  JSON Object => spaceData => list of all ideas within the space
router.get('/:id', async (req, res) => {
  try {
    const spaceData = await Space.findAll({
      where: {
        id: req.params.id,
      }
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

router.post('/', withAuthJson, async (req, res) => {
  try {
    //   check for duplicates
    const mySpaceName = await Space.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (mySpaceName) {
      res.status(400).json({
        message: 'This space name is already taken. Please try again.',
      });
      return;
    }

    const mySpace = await Space.create({
      name: req.body.name,
      user_id: req.session.user_id,
    });

    const myNames = mySpace.toJSON();

    res.status(200).json(myNames);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong', err });
  }
});

module.exports = router;
