const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model {}

Interest.init(
  {},
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'interest',
  }
);

module.exports = Interest;
