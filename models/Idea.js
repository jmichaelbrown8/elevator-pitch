const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Idea extends Model {}

Idea.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pitch: {
      type: DataTypes.TEXT,
    },
    members: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    space_id: {
      type: Sequelize.UUID,
      onDelete: 'SET NULL',
      references: {
        model: 'space',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      afterCreate: async (newIdea) => {
        // Auto apporove idea owner
        const { interest } = sequelize.models;
        await interest.create({
          user_id: newIdea.user_id,
          idea_id: newIdea.id,
          status: 'approved',
        });
        return newIdea;
      },
      afterBulkCreate: async (ideas) => {
        // Auto apporove idea owners
        const interestRequests = ideas.map((newIdea) => ({
          user_id: newIdea.user_id,
          idea_id: newIdea.id,
          status: 'approved',
        }));
        const { interest } = sequelize.models;
        await interest.bulkCreate(interestRequests);
        return ideas;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'idea',
  }
);

module.exports = Idea;
