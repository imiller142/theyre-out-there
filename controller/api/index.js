const router = require('express').Router();

const catchRoutes = require('./catch-routes')
const userRoutes = require('./user-routes');
const lakeRoutes = require('./lake-routes');
const fishdbRoutes = require('./fish_db-routes');

router.use('/lakes', lakeRoutes);
router.use('/users', userRoutes);
router.use('/catch', catchRoutes);
router.use('/fish', fishdbRoutes);



module.exports = router;