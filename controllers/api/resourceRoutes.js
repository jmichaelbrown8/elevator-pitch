const router = require('express').Router();
const { Resource } = require('../../models');
const { withApprovedMembership, withAuth } = require('../../utils/auth');
const upload = require('../../config/upload');
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
      console.log(req.body.name, req.body.type, req.file);
      const { space_id, idea_id } = req.params;

      await Resource.create({
        idea_id,
        name: req.file.filename,
        type: 'image',
        content: `<img style="height:60vh; width:auto" src = "/${req.file.filename}"/>`,
      });

      res.redirect(`/space/${space_id}/idea/${idea_id}`);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource not created!',
        // ...err
      });
    }
  }
);
// doc posting
router.post(
  `${basePath}/doc`,
  withApprovedMembership,
  withAuth,
  upload.single('doc-file'),
  async (req, res) => {
    try {
      console.log(req.body.name, req.body.type, req.file);
      const { space_id, idea_id } = req.params;

      await Resource.create({
        idea_id,
        name: req.file.filename,
        type: 'markdown',
        content: `<object data="${req.file.filename}" type="text/html">${req.file.filename}</object>`,
      });

      res.redirect(`/space/${space_id}/idea/${idea_id}`);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource not created!',
        // ...err
      });
    }
  }
);

router.post(
  `${basePath}/link`,
  withApprovedMembership,
  withAuth,
  upload.single('link'),
  async (req, res) => {
    try {
      const { space_id, idea_id } = req.params;
      console.log(req.file);
      await Resource.create({
        idea_id,
        name: req.file.filename,
        type: 'link',
        content: `<a href = "/${req.file.filename}"/>`,
      });

      res.redirect(`/space/${space_id}/idea/${idea_id}`);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Resource not created!',
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
