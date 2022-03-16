const router = require('express').Router();
const { Resource } = require('../../models');
const { withApprovedMembership, withAuth } = require('../../utils/auth');
const upload = require('../../config/upload');
const { response } = require('express');
// uploads go to the public/upload directory. Included in gitIgnore

const basePath = '/:space_id/idea/:idea_id/resource';
// image posting
router.post(
  `${basePath}/image`,
  withApprovedMembership,
  withAuth,
  upload.single('image-file'),
  async (req, res) => {
    try {
      const { space_id, idea_id } = req.params;

      await Resource.create({
        idea_id,
        name: req.file.filename,
        type: 'image',
        content: `<img style="height:60vh; width:auto" src = "/${space_id}/${idea_id}/${req.file.filename}"/>`,
      });

      localStorage.setItem('toast', 'Successful upload!');
      res.redirect(`/space/${space_id}/idea/${idea_id}`);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource not created!',
      });
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
      // ...err
    }
  }
);

// insert mardown post and link post routes here
router.post(
  `${basePath}/file`,
  withApprovedMembership,
  withAuth,
  async (req, res) => {
    try {
      const { idea_id } = req.params;

      const resourceData = await Resource.create({
        idea_id,
        ...req.body,
      });
      const resource = resourceData.toJSON();
      res.status(200).res.json(resource);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource not created!',
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
