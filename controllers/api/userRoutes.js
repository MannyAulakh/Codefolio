const router = require('express').Router();
const { User, Profile } = require('../../models');
const mailer = require("../../utils/mailer")

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body, { fields: ['email', 'firstname', 'lastname', 'username', 'password'] });
    const row =  await User.findOne( { where: { email: req.body.email } });
    const id = row.id;

    console.log(req.body);
    const profileData = await Profile.create({...req.body, user_id: id}, { fields: ['occupation', 'education', 'experience', 'portfolio_website', 'project1', 'project1_link', 'project2',  'project2_link','project3','project3_link', 'user_id']});

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json("User created");

    })
    
    mailer(req.body.email)
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
