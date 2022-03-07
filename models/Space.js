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
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      afterCreate: async (newSpace) => {
        const { space_member } = sequelize.models;
        await space_member.create({
          user_id: newSpace.user_id,
          space_id: newSpace.id,
          status: 'approved',
        });
        return newSpace;
      },
      afterBulkCreate: async (spaces) => {
        console.log(spaces);
        const spaceMembers = spaces.map((newSpace) => ({
          user_id: newSpace.user_id,
          space_id: newSpace.id,
          status: 'approved',
        }));
        const { space_member } = sequelize.models;
        await space_member.bulkCreate(spaceMembers);
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'space',
  }
);

module.exports = Space;
