const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SpaceMember extends Model {}

SpaceMember.init(
  {
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: ['rejected', 'pending', 'approved'],
      },
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'space_member',
  }
);

module.exports = SpaceMember;
