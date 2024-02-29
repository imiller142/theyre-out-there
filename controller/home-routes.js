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

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login', {layout: false});
  });

router.get('/lakes', (req, res) => {
  Lakes.findAll(
  {
    attributes: ['name', 'city', 'longitude', 'latitude']
  })
  .then(dbLakeData => {
    if (!dbLakeData) {
      res.status(404).json({ message: 'no lakes are currently in the data base please add one'});
      return;
    }

    const lake = dbLakeData.map(lake => lake.get({ plain: true }));

    res.render('lakes', {
      lake
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
})

router.get('/lakes/add', (req, res) => {
  res.render('add-lakes')
})

module.exports = router;
