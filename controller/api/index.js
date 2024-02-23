const router = require('express').Router();
const { User } = require('../../model');

const userRoutes = require('./user');

router.use('/users', userRoutes);



module.exports = router;