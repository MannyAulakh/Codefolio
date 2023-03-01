const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const profileRoutes = require('./profileRoutes');


router.use('/users', userRoutes);
// router.use("/profile", profileRoutes);
//ADD ADDITIONAL ROUTES
//router.use('/ ', );

module.exports = router;
