const sequelize = require('../config/connection');
const { Space, User, Idea, Interest, Comment } = require('../models');

const spaceData = require('./spaceData.json');
const userData = require('./userData.json');
const ideaData = require('./ideaData.json');
const interestData = require('./interestData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true,
  });

  await Space.bulkCreate(spaceData);
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Idea.bulkCreate(ideaData);
  await Interest.bulkCreate(interestData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
