const sequelize = require('../config/connection');
const { Space, User, Idea, Comment } = require('../models');

const spaceData = require('./spaceData.json');
const userData = require('./userData.json');
const ideaData = require('./ideaData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Space.bulkCreate(spaceData);

  await Idea.bulkCreate(ideaData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
