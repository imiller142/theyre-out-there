const router = require('express').Router();


const userRoutes = require('./user-routes');
const lakeRoutes = require('./lake-routes');

router.use('/lakes', lakeRoutes);
router.use('/users', userRoutes);



module.exports = router;