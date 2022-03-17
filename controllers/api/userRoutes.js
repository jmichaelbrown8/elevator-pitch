const router = require('express').Router();
const { User } = require('../../models');

const popSessionRedirectUrl = (req) => {
  const redirect = req.session.authRedirectedFrom;

  if (redirect) {
    delete req.session.authRedirectedFrom;
  }

  return redirect;
};

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const redirect = popSessionRedirectUrl(req);

    req.session.user_id = userData.id;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.status(200).json({
        redirect,
        message: `User ${userData.name} created`,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: 'Something went wrong.',
      // ...err
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      throw {
        message: 'Incorrect email or password, please try again',
      };
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      throw {
        message: 'Incorrect email or password, please try again',
      };
    }

    const redirect = popSessionRedirectUrl(req);

    req.session.user_id = userData.id;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.json({
        // user: userData,
        message: `You are now logged in!`,
        redirect,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
