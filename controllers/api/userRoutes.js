const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.status(200).json({
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
        username: req.body.email,
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

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.json({
        // user: userData,
        message: `You are now logged in!`,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
