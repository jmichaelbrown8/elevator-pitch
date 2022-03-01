const sequelize = require('../config/connection');
const {
    User,
    Idea,
    Interest,
    Comment,
} = require('../models');

const userData = require('./userData.json');
const ideaData = require('./ideaData.json');
const interestData = require('./interestData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({
        force: true
    });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const ideas = await Idea.bulkCreate(ideaData);
    const interest = await Interest.bulkCreate(interestData);
    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();