const router = require('express').Router();
const { Interest } = require('../../models');
const { withAuthJson, withApprovedMembership } = require('../../utils/auth');

const baseRoute = '/:space_id/idea/:idea_id/interest';

// Input:   req.session.user_id and param for idea_id
// Output:  boolean to indicate if the user has already shown interest or not
router.get(
  baseRoute,
  withApprovedMembership,
  withAuthJson,
  async (req, res) => {
    try {
      const { idea_id } = req.params;
      const interestData = await Interest.findAll({
        attributes: ['user_id'],
        where: {
          idea_id
        },
      });

      res.status(200).json({
        interested: interestData.length ? true : false,
      });
    } catch (err) {
      let message = 'Something went wrong.';

      res.status(400).json({
        message,
        err,
      });
    }
  }
);

// Input:   idea_id, user_id
// Creates a new interest relation between user and idea
router.post(
  baseRoute,
  withApprovedMembership,
  withAuthJson,
  async (req, res) => {
    try {
      const { user_id } = req.session;
      const { idea_id } = req.params;
      // Create interest if it doesn't exist
      await Interest.create({
        idea_id,
        user_id,
      });
      res.status(200).json({ interested: true });
    } catch (err) {
      let message = 'Something went wrong.';

      res.status(400).json({
        message,
        err,
      });
    }
  }
);

router.delete(
  baseRoute,
  withApprovedMembership,
  withAuthJson,
  async (req, res) => {
    try {
      const { user_id } = req.session;
      const { idea_id } = req.params;
      await Interest.destroy({
        where: {
          idea_id,
          user_id,
        },
      });
      res.status(200).json({ interested: false });
    } catch (err) {
      let message = 'Something went wrong.';

      res.status(400).json({
        message,
        err,
      });
    }
  }
);

module.exports = router;
