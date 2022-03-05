const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SpaceMember extends Model {}

SpaceMember.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    space_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'space',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: ['rejected', 'pending', 'approved'],
      },
      defaultValue: 'pending',
    },
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
