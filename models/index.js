const Space = require('./Space');
const User = require('./User');
const Idea = require('./Idea');
const Resource = require('./Resource');
const Interest = require('./Interest');
const Comment = require('./Comment');
const IdeaUpvote = require('./IdeaUpvote');
const SpaceMember = require('./SpaceMember');

User.hasMany(Idea, {
  foreignKey: 'user_id',
  as: 'ownedIdeas'
});

Idea.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'creator',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

User.hasMany(Space, {
  foreignKey: 'user_id',
  as: 'ownedSpaces',
});

User.hasMany(SpaceMember, {
  as: 'memberships',
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

SpaceMember.belongsTo(Space, {
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

Idea.hasMany(Interest, {
  foreignKey: 'idea_id',
});

Idea.hasOne(Interest, {
  foreignKey: 'idea_id',
  as: 'myInterest'
});

Idea.belongsTo(Space, {
  foreignKey: 'space_id',
});

Space.hasMany(Idea, {
  foreignKey: 'space_id',
});

Idea.hasMany(Resource, {
  foreignKey: 'idea_id',
});

Interest.belongsTo(User, {
  foreignKey: 'user_id',
});

Interest.belongsTo(Idea, {
  foreignKey: 'idea_id',
});

Resource.belongsTo(Idea, {
  foreignKey: 'idea_id',
});

Idea.hasMany(Comment, {
  foreignKey: 'idea_id',
});

Idea.belongsToMany(User, {
  foreignKey: 'idea_id',
  through: IdeaUpvote,
  as: 'upvoter',
});

Idea.hasMany(IdeaUpvote, {
  as: 'upvotes',
  foreignKey: 'idea_id',
});

User.belongsToMany(Idea, {
  foreignKey: 'user_id',
  through: IdeaUpvote,
  as: 'upvotes',
});

module.exports = {
  Space,
  User,
  Idea,
  Resource,
  Interest,
  Comment,
  SpaceMember,
  IdeaUpvote,
};
