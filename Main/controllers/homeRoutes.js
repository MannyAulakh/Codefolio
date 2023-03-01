const router = require('express').Router();
// ADD MODELS
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll()

    const Posts = postData.map((p) => p.get({ plain: true }))

    res.render('homepage', {
      Posts
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
