const { User, SpaceMember } = require('../models');

const fetchSessionUser = async (req, res, next) => {
  if (req.session.user_id) {
    const authUser = await User.findByPk(req.session.user_id, {
      attributes: ['id'],
      include: [{
        model: SpaceMember,
        attributes: ['space_id','status'],
        as: 'memberships'
      }],
    });

    if (!authUser) {
      // Known user is know longer valid, log them out!
      req.session.destroy(() => next());
      return;
    }

    const authUserData = authUser.toJSON();

    req.authUser = {
      ...authUserData,
      // Create a key based object out of the array list
      memberships: authUserData.memberships.reduce(
        (memberships, membership) => ({
          ...memberships,
          [membership.space_id]: membership.status
        }),
        {}
      )
    };

    console.log(req.authUser);
  }

  next();
};

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

// this one is for when checking auth from an api endpoint
const withAuthJson = (req, res, next) => {
  // If the user is not logged in, respond with a 403 and a helpful message
  if (!req.session.loggedIn) {
    res.status(403).json({
      message: "You're not logged in",
    });
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = {
  withAuth,
  withAuthJson,
  fetchSessionUser,
};
