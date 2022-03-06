const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');
const SpaceMember = require('./SpaceMember');

User.hasMany(Idea, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

User.hasMany(Space, {
  foreignKey: 'user_id',
  as: 'ownedSpaces',
});

User.hasMany(SpaceMember, {
  as: 'memberships'
});

User.belongsToMany(Space, {
  through: SpaceMember,
  as: 'spaces',
  foreignKey: 'user_id',
});

Space.belongsToMany(User, {
  through: SpaceMember,
  as: 'members',
  foreignKey: 'space_id',
});

User.belongsToMany(Idea, {
  through: Interest,
  as: 'interesting_ideas',
  foreignKey: 'user_id',
});

Idea.belongsToMany(User, {
  through: Interest,
  as: 'interested_users',
  foreignKey: 'idea_id',
});

Idea.belongsTo(Space, {
  foreignKey: 'space_id',
});

Space.hasMany(Idea, {
  foreignKey: 'space_id',
});

Idea.hasMany(Comment, {
  foreignKey: 'idea_id',
});

module.exports = {
  Space,
  User,
  Idea,
  Interest,
  Comment,
  SpaceMember
};
