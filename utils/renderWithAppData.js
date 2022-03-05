const { User } = require("../models");

const renderWithAppData = async (req, res, next) => {
  // Deconstruct data from the user's session
  const { loggedIn, user_id } = req.session;

  req.viewData = {
    loggedIn,
  };

  if (loggedIn && user_id) {

    // Add the current user data if we have a logged in user id to work with.
    const userRecord = await User.findByPk(user_id, {
      attributes: { exclude: ["password"] },
    });

    if (userRecord) {
      req.viewData.user_id = user_id;
      req.viewData.user = userRecord.toJSON();
    }
  }

  const render = res.render.bind(res);

  res.render = ( name, data ) => render( name, {
    ...(data ? data : {}),
    ...req.viewData
  } );

  return next();
};

module.exports = renderWithAppData;