const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Space extends Model {}

Space.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: 'Space',
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'space',
  }
);

module.exports = Space;
