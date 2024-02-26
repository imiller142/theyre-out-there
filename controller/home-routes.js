const router = require('express').Router();
const sequelize = require('../config/connection');
const { Lakes, Fish_Available, Fish_db, User, Fish_Caught  } = require('../model');

router.get('/', (req, res) => {
    console.log(req.session);
    Fish_Caught.findAll({
      include: [
        {
          model: Lakes,
          attributes: ['id', 'name', 'city'],

        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        console.log(dbPostData[0]);
        const fish_caught = dbPostData.map(fish => fish.get({ plain: true }));
        res.render('homepage', {
          fish_caught,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;
