const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model {}

Interest.init(
  {
    details: DataTypes.STRING,
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['rejected', 'pending', 'approved']],
      },
      defaultValue: 'pending',
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'interest',
  }
);

module.exports = Interest;
