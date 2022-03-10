const router = require('express').Router();
const { SpaceMember } = require('../../models');
const { withAuthJson } = require('../../utils/auth');

router.post('/:space_id/member', withAuthJson, async (req, res) => {
  try {
    const { space_id } = req.params;
    const { user_id } = req.session;

    const member = await SpaceMember.create({
      space_id,
      user_id,
      // status: 'pending',
    });

    res.status(200).json(member);
  } catch (err) {
    res.status(400).json({ message: 'Unable to request access to space' });
  }
});

// Updates the status of a member in a space
router.post('/:space_id/update', withAuthJson, async (req, res) => {
  try {
    const { user_id, status } = req.body;
    const member = await SpaceMember.findOne({
      where: {
        space_id: req.params.space_id,
        user_id
      },
    });

    member.status = status;
    member.save();
    console.log(member);
    res.status(200).json({ member });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Update failed' });
  }
});

module.exports = router;
