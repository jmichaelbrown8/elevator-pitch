const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class IdeaUpvote extends Model {}

IdeaUpvote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'idea_upvote',
  }
);


module.exports = IdeaUpvote;
