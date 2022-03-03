const router = require('express').Router();
const { Space, Idea } = require('../models');
const { withAuth } = require('../utils/auth');

//Home/Dashboard
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {});
});

//signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

//get space

// View a specific space
router.get('/space/:space_id', async (req, res) => {
  console.log(req.params.space_id);
  try {
    const mySpaceData = await Space.findOne({
      where: {
        id: req.params.space_id,
      },
      includes: [{ model: Idea }],
    });
    const mySpace = mySpaceData.toJSON();

    res.render('space', {
      mySpace,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create idea page
router.get('/space/:space_id/idea', withAuth);

// View a specific idea
router.get('/idea/:idea_id', withAuth);

//signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
