const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');

User.hasMany(Idea, {
  foreignKey: 'user_id',
});

User.hasMany(Interest, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
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

module.exports = {
  Space,
  User,
  Idea,
  Interest,
  Comment,
};
