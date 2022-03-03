const router = require('express').Router();
const { Idea, Space } = require('../models');
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

// View a specific space name and ideas associated.
router.get('/space/:id', async (req, res) => {
  try {
    const spaceData = await Space.findByPk(req.params.id);
    const ideaData = await Idea.findAll({
      where: {
        space_id: req.params.id,
      },
    });
    const space = spaceData.get({ plain: true });
    const ideas = ideaData.map((element) => element.get({ plain: true }));

    res.render('space', { space, ideas });

  } catch (err) {
    res.status(400).json(err);
    console.log(err);
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
