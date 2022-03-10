const router = require('express').Router();
const {
  withAuth,
  withApprovedMembership,
  withNoMembership,
} = require('../utils/auth');
const {
  Idea,
  Space,
  Comment,
  User,
  Interest,
  SpaceMember,
  Resource,
} = require('../models');

//Home/Dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: SpaceMember,
          as: 'memberships',
          include: Space,
        },
      ],
    });
    const memberships = userData.memberships.map((membershipData) =>
      membershipData.toJSON()
    );
    res.render('homepage', {
      memberships,
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
router.get(
  '/space/:space_id',
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const spaceData = await Space.findByPk(req.params.space_id, {
        include: [
          {
            model: Idea,
            include: { model: User, as: 'interested_users' },
          },
          {
            model: User,
            as: 'members',
          },
        ],
      });
      const space = spaceData.toJSON();

      res.render('space', { space });
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  }
);

// Create space access page
router.get(
  '/space/:space_id/access',
  withNoMembership,
  withAuth,
  async (req, res) => {
    try {
      const { space_id } = req.params;

      res.render('space-access', { space_id });
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  }
);

// Get idea create page
router.get(
  '/space/:space_id/ideas',
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const spaceData = await Space.findByPk(req.params.space_id);
      const space = spaceData.toJSON();

      res.render('ideaCreate', { space });
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  }
);

// View a specific idea
router.get(
  '/space/:space_id/idea/:idea_id',
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const { space_id, idea_id } = req.params;
      const ideaData = await Idea.findByPk(idea_id, {
        include: [
          {
            model: User,
            through: Interest,
            as: 'interested_users',
          },
          {
            model: Resource,
            attributes: {
              include: ['id', 'name', 'type']
            }
          }
        ],
      });
      const commentData = await Comment.findAll({
        where: {
          idea_id: ideaData.id,
        },
      });

      const ideaPlain = ideaData.get({ plain: true });
      const { resources, ...idea } = ideaPlain;
      const comments = commentData.map((element) =>
        element.get({ plain: true })
      );

      res.render('idea', {
        idea,
        resources,
        comments,
        space_id,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

// Create a new resource
router.get(
  '/space/:space_id/idea/:idea_id/resource/create',
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    res.render( 'resourceCreate' );
  }
);

// View a specific resource
router.get(
  '/space/:space_id/idea/:idea_id/resource/:id_resource',
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    // TODO Get specific resource and provide to view.
    res.render( 'resource' );
  }
);

//signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
