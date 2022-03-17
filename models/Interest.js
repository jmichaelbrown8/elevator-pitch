const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model {}

Interest.findUserApprovalInSpace = async function (user_id, space_id) {
  const { interest, idea, space } = sequelize.models;

  const result = await interest.findOne({
    where: {
      user_id,
      status: 'approved',
    },
    include: {
      model: idea,
      include: {
        model: space,
        where: {
          id: space_id,
        },
        require: true
      },
      require: true
    },
  });

  return result.idea ? result : undefined;
};

Interest.init(
  {
    details: DataTypes.STRING,
    status: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['removed', 'dismissed', 'pending', 'approved']],
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
