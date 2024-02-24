const router = require('express').Router();

const catchRoutes = require('./catch-routes')
const userRoutes = require('./user-routes');
const lakeRoutes = require('./lake-routes');

router.use('/lakes', lakeRoutes);
router.use('/users', userRoutes);
router.use('/catch', catchRoutes);



module.exports = router;