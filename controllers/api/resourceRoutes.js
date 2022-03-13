const router = require('express').Router();
const { Resource } = require('../../models');
const { withApprovedMembership, withAuth } = require('../../utils/auth');
const upload = require('../../config/upload');
// uploads go to the public/upload directory. Included in gitIgnore

const basePath = '/:space_id/idea/:idea_id/resource';

router.post(
  basePath,
  withApprovedMembership,
  withAuth,
  upload.single('image-file'),
  async (req, res, next) => {
    try {
      const { idea_id } = req.params;
      const resourceData = await Resource.create({
        name: req.body.name,
        type: req.body.type,
        content: req.file.path,
      });
      resource = resourceData.toJSON();
      console.log(resource);
      resourceData.save(() => {
        res.status(200).json({
          message: `Resource created`,
        });
      });

      document.location.reload();
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource created',
        // ...err
      });
    }
  }
);
// not sure if I need two. Only difference is 'image' vs 'link'. The documentation specified different routes for different file types but it does seem redundant.
router.post(
  '/:space_id/idea/:idea_id/resource',
  withApprovedMembership,
  withAuth,
  upload.single('link-file'),
  async (req, res) => {
    try {
      const { idea_id } = req.params;
      const resourceData = await Resource.create({
        ...req.body,
        content: req.file,
        idea_id,
      });

      const resource = resourceData.json();
      res.status(200).json(resource);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Unable to create a resource.',
        // ...err
      });
    }
  }
);

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

      res.status(200).json(resource);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
