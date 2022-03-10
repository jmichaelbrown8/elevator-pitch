const router = require('express').Router();
const { Resource } = require('../../models');
const { withApprovedMembership, withAuth } = require('../../utils/auth');

const basePath = '/:space_id/idea/:idea_id/resource';

router.post(basePath, withApprovedMembership, withAuth, async (req, res) => {
  try {
    const { idea_id } = req.params;
    res.status(200).json(
      await Resource.create({
        ...req.body,
        idea_id,
      })
    );
  } catch (err) {
    res.status(400).json({
      message: 'Unable to create a resource.',
      // ...err
    });
  }
});

router.put(
  `${basePath}/:resource_id`,
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const { resource_id } = req.params;
      const resource = await Resource.findByPk(resource_id);

      if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
      }

      const { name, content, type } = req.body;

      if (name) {
        resource.name = name;
      }
      if (content) {
        resource.content = content;
      }
      if (type) {
        resource.type = type;
      }

      await resource.save();

      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete(
  `${basePath}/:resource_id`,
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const { resource_id } = req.params;
      const resource = await Resource.findByPk(resource_id);

      if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
      }

      await resource.destroy();

      res.status(200).json( resource );
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;