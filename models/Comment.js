const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'user',
        key: 'id',
      },
    },
    idea_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'idea',
        key: 'id',
      },
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
