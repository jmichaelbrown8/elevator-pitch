const router = require('express').Router();
const { Idea } = require('../models');
// const { Space, Idea, Interest, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// View a specific space
router.get('/space/:space_id', async (req, res) => {
  try {
    const ideaData = await Idea.findAll({
      where: {
        space_id: req.params.space_id,
      },
    });
    const ideas = ideaData.map((element) =>
      element.get({ plain: true })
    );
    res.render('space', { 'ideas': ideas });
    // res.status(200).json(ideaData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// Create idea page
router.get('/space/:space_id/idea', withAuth);

// View a specific idea
router.get('/idea/:idea_id', withAuth);

module.exports = router;
