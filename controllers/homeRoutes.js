const router = require('express').Router();
const { Post, User, Profile, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


router.get('/', withAuth, async (req, res) => {
  try {

    const data = await Post.findAll({
      include: [{
        model: Comment,
        plain: true,
        include: [{
          model: User,
          attributes: { exclude: ["password"] },
          plain: true,
        },],
      }, {
        model: User,
        plain: true,
      }],
    });



    const newData = data.map((post) => post.get({ plain: true }));

    var Posts = newData
    
    console.log(newData);

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
