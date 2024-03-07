const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')
const fishRoutes = require('./fish_db-user-routes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes)
router.use('/', fishRoutes)

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;