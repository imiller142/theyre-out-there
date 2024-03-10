const router = require('express').Router();
const sequelize = require('../config/connection');
const { Lakes, Fish_Available, Fish_db, User, Fish_Caught  } = require('../model');
const getLakes = require('../utils/getLakes')

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

router.get('/signup', (req, res) => {
  res.render('signup', {layout: false})
})

router.get('/lakes', (req, res) => {
  Lakes.findAll(
  {
    include: {
      model: Fish_db,
      as: 'Fish_in_lake'
    },
    attributes: ['id', 'name', 'city', 'longitude', 'latitude']
  })
  .then(dbLakeData => {
    if (!dbLakeData) {
      res.status(404).json({ message: 'no lakes are currently in the data base please add one'});
      return;
    }

    const lake = dbLakeData.map(lake => lake.get({ plain: true }));
    console.log(lake)
    res.render('lakes', {
      lake,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});



router.get('/lakes/add', (req, res) => {
  res.render('add-lakes', {
    loggedIn: req.session.loggedIn
  })
});

router.get('/lakes/:id', (req,res) =>{
  Lakes.findOne(
    {
      include: {
        model: Fish_db,
        attributes: ['common_name']
      },
      attributes: ['name', 'city', 'longitude', 'latitude']
    }
  )
  .then(dbLakeData => {
    if (!dbLakeData) {
      res.status(404).json({ message: 'no lakes are currently in the data base please add one'});
      return;
    }

    const lake = dbLakeData.get({ plain: true });

    res.render('single-lake', {
      lake,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/fish/add', (req, res) => {
  res.render('add-fish', {
    loggedIn: req.session.loggedIn
  })
})

router.get('/add-catch', getLakes(), (req, res) => {
  Fish_db.findAll({

  }
  )
  .then(dbFishData => {
    if (!dbFishData) {
      res.status(404).json({ message: 'no fish are currently in the data base'});
      return;
    }
    const fish = dbFishData.map(fish => fish.get({ plain: true }));
    console.log(fish)
    res.render('add-catch', {
      fish,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/fish', (req, res) => {
  Fish_db.findAll({
    
    }
  )
  .then(dbFishData => {
    if (!dbFishData) {
      res.status(404).json({ message: 'no fish are currently in the data base'});
      return;
    }
    const fish = dbFishData.map(fish => fish.get({ plain: true }));
    
    res.render('fish', {
      fish,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })

})

module.exports = router;
