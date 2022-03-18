const router = require('express').Router();
const { Idea } = require('../../models');
const {
  withApprovedMembership,
  withAuthJson,
  withNoIdeaApprovals,
  withIdeaOwnership,
} = require('../../utils/auth');

const basePath = '/:space_id/idea';

// Creates a new idea
router.post(
  basePath,
  withApprovedMembership,
  withNoIdeaApprovals,
  withAuthJson,
  async (req, res) => {
    try {
      const { user_id } = req.session;
      const { space_id } = req.params;

      const idea = await Idea.create({
        ...req.body,
        user_id,
        space_id,
      });
      const myIdea = idea.toJSON();
      res.status(200).json(myIdea);
    } catch (err) {
      let message = 'Something went wrong.';
      console.log(err);
      res.status(400).json({
        message,
        err,
      });
    }
  }
);

// Creates a new idea
router.delete(
  `${basePath}/:idea_id`,
  withApprovedMembership,
  withIdeaOwnership,
  withAuthJson,
  async (req, res) => {
    const { user_id } = req.session;
    const { idea_id } = req.params;
    try {
      await Idea.destroy({
        where: {
          id: idea_id,
          user_id
        },
        individualHooks: true
      });
      res.status(200).json({ message: 'Idea deleted' });
    } catch (err) {
      let message = 'Something went wrong.';
      console.log(err);
      res.status(400).json({
        message,
        err,
      });
    }
  }
);

module.exports = router;
