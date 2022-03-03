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
      message: 'You\'re not logged in',
    });
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = {
  withAuth,
  withAuthJson,
};
