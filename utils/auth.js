const { User, SpaceMember } = require('../models');

/**
 * HELPER METHODS: For use in middleware, (Not middleware itself)
 */
const invalidateAuth = (req, redirect, message) => {
  if (!req.authState || req.authState.valid) {
    req.authState = {
      valid: false,
      redirect,
      message,
    };
  }
};

const validateAuthUser = (req, redirect, message) => {
  if (!('authUser' in req)) {
    invalidateAuth(req, redirect, message);
    return false;
  }
  return true;
};
/**
 * END HELPER METHODS
 */

/**
 * Attempts the fetch needed base info about a user for other authentication tasks.
 */
const fetchSessionUser = async (req, res, next) => {
  if (req.session.user_id) {
    // Get the user with their space memberships
    const authUser = await User.findByPk(req.session.user_id, {
      attributes: ['id'],
      include: [
        {
          model: SpaceMember,
          attributes: ['space_id', 'status'],
          as: 'memberships',
        },
      ],
    });

    if (!authUser) {
      // Known user is know longer valid, log them out!
      req.session.destroy(() => next());
      return;
    }

    // Get a simple object from of the model data
    const authUserData = authUser.toJSON();

    // Rebuild the object with a modified `memberships` property for key based lookups.
    req.authUser = {
      ...authUserData,
      // Create a key based object out of the array list
      memberships: authUserData.memberships.reduce(
        (memberships, membership) => ({
          ...memberships,
          [membership.space_id]: membership.status,
        }),
        {}
      ),
    };
  }

  next();
};

const withApprovedMembership = (req, res, next) => {
  const { space_id } = req.params;

  const errorRedirect = `/space/${space_id}/access`;
  const errorMessage = 'You are not an approved member of this space.';

  // Validate the authUser was loaded correctly
  if (validateAuthUser(req, errorRedirect, errorMessage)) {
    const { memberships } = req.authUser;

    // Invalidate the request if they don't have a membership for the space or it's not approved.
    if (!(space_id in memberships) || memberships[space_id] !== 'approved') {
      invalidateAuth(req, errorRedirect, errorMessage);
    }
  }

  next();
};

const withNoMembership = (req, res, next) => {
  const { space_id } = req.params;

  const errorRedirect = `/space/${space_id}`;
  const errorMessage = 'You are already an approved member of this space.';

  // Validate the authUser was loaded correctly
  if (validateAuthUser(req, errorRedirect, errorMessage)) {
    const { memberships } = req.authUser;

    // Invalidate the request if they have an approved membership already.
    if (space_id in memberships && memberships[space_id] === 'approved') {
      invalidateAuth(req, errorRedirect, errorMessage);
    }
  }

  next();
};

const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else if (req.authState && !req.authState.valid) {
    // If previous middleware invalidated `req.authState`, redirect the user
    res.redirect(req.authState.redirect);
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

// this one is for when checking auth from an api endpoint
const withAuthJson = (req, res, next) => {
  if (!req.session.loggedIn) {
    // If the user is not logged in, respond with a 403 and a helpful message
    res.status(403).json({
      message: "You're not logged in",
    });
  } else if (req.authState && !req.authState.valid) {
    // If previous middleware invalidated `req.authState`, error the request
    res.status(403).json({
      message: req.authState.message,
    });
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = {
  withApprovedMembership,
  withNoMembership,
  withAuth,
  withAuthJson,
  fetchSessionUser,
};
