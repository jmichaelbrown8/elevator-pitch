const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');
<<<<<<< HEAD
const IdeaUpvote = require('./IdeaUpvote');
=======
const IdeaUpvote = require('./Upvote');
const SpaceMember = require('./SpaceMember');
>>>>>>> db2692371ceec99b5eca361453c8d1f1929cd8fa

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
