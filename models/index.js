const User = require('./User');
const Idea = require('./Idea');
const Interest = require('./Interest');
const Comment = require('./Comment');

User.hasMany(Idea, {
    foreignKey: 'user_id'
});

User.hasMany(Interest, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Idea.hasMany(Interest, {
    foreignKey: 'idea_id'
});

Idea.hasMany(Comment, {
    foreignKey: 'idea_id'
});

module.exports = {
    User,
    Idea,
    Interest,
    Comment,
};