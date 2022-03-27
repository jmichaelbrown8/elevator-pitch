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
          user_id,
        },
        individualHooks: true,
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

// Abandon an idea
router.put(
  `${basePath}/:idea_id/abandon`,
  withApprovedMembership, // must be space member
  withIdeaOwnership, // must be idea owner
  withAuthJson, // must be logged in (of course)
  async (req, res) => {
    const { user_id } = req.session;
    const { idea_id } = req.params;
    try {
      await Idea.update(
        {
          user_id: null,
        },
        {
          where: {
            id: idea_id,
          },
        }
      );
      res.status(200).json({ message: 'Idea abandoned' });
    } catch (err) {
      res.status(400).json({
        message: `User ${user_id} failed to abandon idea ${idea_id}`,
        err,
      });
    }
  }
);

// Claim an idea
router.put(
  `${basePath}/:idea_id/claim`,
  withApprovedMembership, // must be a space member
  withNoIdeaApprovals, // must not be approved for another idea
  withAuthJson, // must be logged in
  async (req, res) => {
    const { user_id } = req.session;
    const { idea_id } = req.params;
    try {
      // ensure idea has no current owner
      const ideaData = await Idea.findByPk(idea_id);
      const idea = ideaData.toJSON();
      if (idea.user_id) {
        throw `This idea ${idea_id} is already claimed by a user ${user_id}`;
      }
      await Idea.update(
        {
          user_id,
        },
        {
          where: {
            id: idea_id,
          },
        }
      );
      res.status(200).json({ message: 'Idea claimed' });
    } catch (err) {
      res.status(400).json({
        message: `User ${user_id} failed to claim idea ${idea_id}`,
        err,
      });
    }
  }
);

module.exports = router;
