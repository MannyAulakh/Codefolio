const router = require('express').Router();
// ADD MODELS
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // #TODO
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
