const sequelize = require('../config/connection');
const { User, Profile, Post, Comment } = require('../models');

const userData = require('./userData.json');
const profileData = require('./profileData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const profiles = await Profile.bulkCreate(profileData, {
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
