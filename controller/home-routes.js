const router = require('express').Router();
const sequelize = require('../config/connection');
const { Lakes, Fish_Available, Fish_db, User, Fish_Caught  } = require('../model');
const withAuth = require('../utils/withAuth');


router.get('/', (req, res) => {
    console.log(req.session);
    Fish_Caught.findAll({
      order: [['weight', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],

        },
        {
          model: Lakes,
          attributes: ['id', 'name', 'city'],

        },
        {
          model: Fish_db
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        const fish_caught = dbPostData.map(fish => fish.get({ plain: true }));
        console.log(fish_caught)
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



router.get('/lakes/add', withAuth, (req, res) => {
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

router.get('/fish/add', withAuth, (req, res) => {
  res.render('add-fish', {
    loggedIn: req.session.loggedIn
  })
})

router.get('/add-catch', withAuth, (req, res) => {
  Promise.all([Fish_db.findAll({}), Lakes.findAll({}) ])
  .then(dbFishData => {
    if (!dbFishData) {
      res.status(404).json({ message: 'no fish are currently in the data base'});
      return;
    }
    const lakes = dbFishData[1].map(lakes => lakes.get({ plain: true }));
    const fish = dbFishData[0].map(fish => fish.get( {plain: true }));
    console.log(fish)
    console.log(lakes)
    res.render('add-catch', {
      fish,
      lakes,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/catch/edit', withAuth, (req, res) => {
  Fish_Caught.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: User,
        attributes: ['username'],

      },
      {
        model: Lakes,
        attributes: ['id', 'name', 'city'],

      },
      {
        model: Fish_db
      }
    ]
  })
  .then(dbCatchData => {
    const fish_caught = dbCatchData.map(catchs => catchs.get({ plain: true}));
    console.log(fish_caught)
    res.render('edit-catches', {
      fish_caught,
      loggedIn: req.session.loggedIn
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
})

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
