const sequelize = require('../config/connection');
const { Space, User, Idea, Comment, Resource, SpaceMember, Interest } = require('../models');

const spaceData = require('./spaceData.json');
const userData = require('./userData.json');
const ideaData = require('./ideaData.json');
const commentData = require('./commentData.json');
const resourceData = require('./resourceData.json');
const spaceMemberData = require('./spaceMemberData.json');
const interestData = require('./interestData.json');

const seedDatabase = async () => {
  await sequelize.sync({
    force: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Space.bulkCreate(spaceData);
  await SpaceMember.bulkCreate(spaceMemberData);

  await Idea.bulkCreate(ideaData);
  await Resource.bulkCreate(resourceData);
  await Comment.bulkCreate(commentData);
  await Interest.bulkCreate(interestData);

  process.exit(0);
};

seedDatabase();
