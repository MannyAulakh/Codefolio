const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
//ADD ADDITIONAL ROUTES
//router.use('/ ', );

module.exports = router;
