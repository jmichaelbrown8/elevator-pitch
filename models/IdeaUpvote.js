const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class IdeaUpvote extends Model {}

IdeaUpvote.init(
  {},
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'idea_upvote',
  }
);


module.exports = IdeaUpvote;
