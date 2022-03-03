const router = require('express').Router();
const { Space } = require('../../models');
const withAuth = require('../../utils/auth');

// Input:   id (space UUID)
// Output:  JSON Object => spaceData => list of all ideas within the space
router.get('/:id', async (req, res) => {
  try {
    const spaceData = await Space.findAll({
      where: {
        id: req.params.id,
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

router.post('/name/:space-name', withAuth, async (req, res) => {
  try {
    const mySpaceName = await Space.findOne({
      where: {
        name: req.params.space_name,
      },
    });

    if (mySpaceName) {
      res
        .status(400)
        .json({
          message: 'This space name is already taken. Please try again.',
        });
      return;
    }

    const mySpace = await Space.create({
      name: req.params.space_name,
      user_id: req.session.user_id,
    });

    const myNames = mySpace.toJSON();
    console.log(myNames);
    res.render('space', {
      myNames,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
