const router = require('express').Router();
const userRoutes = require('./userRoutes');
const BlogRoutes = require('./BlogRoutes');

router.use('/users', userRoutes);
//ADD ADDITIONAL ROUTES
//router.use('/ ', );

module.exports = router;
