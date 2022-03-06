const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');
const IdeaUpvote = require('./Upvote');

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
  as: 'upvote'
});

User.belongsTo(Idea, {
  foreignKey: 'user_id',
  through : IdeaUpvote,
  as: 'upvotes'
});

Idea.belongsTo(User, {
  foreignKey: 'idea_id',
  through: IdeaUpvote,
  as: ''
});

module.exports = {
  Space,
  User,
  Idea,
  Interest,
  Comment,
};
