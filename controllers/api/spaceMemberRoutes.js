const router = require('express').Router();
const { SpaceMember } = require('../../models');
const { withAuthJson } = require('../../utils/auth');

router.post('/:space_id/member', withAuthJson, async (req, res) => {
  try {
    console.log( req.params );
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

module.exports = router;
