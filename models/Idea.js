const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Idea extends Model {}

Idea.init({
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
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'idea',
});

module.exports = Idea;