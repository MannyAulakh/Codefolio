const router = require('express').Router();
const { Post, User, Profile } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all Posts
    const postData = await Post.findAll();
    // Serialize data so the template can read it
    const Posts = postData.map((post) => post.get({ plain: true }));

    //Get User Info
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


router.get('/Post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('Post', {
      ...post,
      logged_in: req.session.logged_in
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
