const router = require('express').Router();
const { Post, User, Profile } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


router.get('/', withAuth, async (req, res) => {
  try {

    const [results, metadata] = await sequelize.query("SELECT post_title, post_content, post_date_created, post_username, comment_content, comment_date_created, username AS comment_username FROM(SELECT post.id AS post_id, user.id AS user_id, title AS post_title, post.content AS post_content, post.date_created AS post_date_created, user.username AS post_username, comment.content AS comment_content, comment.date_created AS comment_date_created, comment.user_id AS comment_user_id FROM post JOIN user ON post.user_id = user.id JOIN comment ON post.id = comment.post_id) AS post_comment_user JOIN user ON post_comment_user.comment_user_id = user.id");
    const Posts = results;

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] }
    });
    
    // const user = userData.map((user) => user.get({ plain: true }));
    const user = userData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('homepage', {
      Posts,
      logged_in: req.session.logged_in,
      userID: req.session.user_id,
      user

    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});


router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Profile }, { model: Post }],
    });

    // const user = userData.map((user) => user.get({ plain: true }));
    const user = userData.get({ plain: true });
    console.log(user);

    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
