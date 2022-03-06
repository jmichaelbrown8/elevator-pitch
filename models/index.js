const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');
const IdeaUpvote = require('./IdeaUpvote');
const SpaceMember = require('./SpaceMember');

User.hasMany(Idea, {
  foreignKey: 'user_id',
});

User.hasMany(Interest, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

User.hasMany(Space, {
  foreignKey: 'user_id',
  as: 'ownedSpaces',
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

Idea.hasMany(Interest, {
  foreignKey: 'idea_id',
});

Space.hasMany(Idea, {
  foreignKey: 'space_id',
});

Idea.hasMany(Comment, {
  foreignKey: 'idea_id',
});

Idea.hasMany(User, {
  foreignKey: 'user_id',
  as: 'upvoter'
});

User.belongsTo(Idea, {
  foreignKey: 'user_id',
  through : IdeaUpvote,
  as: 'upvotes'
});


module.exports = {
  Space,
  User,
  Idea,
  Interest,
  Comment,
};
