const router = require('express').Router();
const { Lakes } = require('../../model');

//get all lakes
router.get('/', (req, res) => {
    Lakes.findAll({
    })
    .then(dbLakeData => res.json(dbLakeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//get one lake
router.get('/:id', (req, res) => {
    Lakes.findOne({

    })
    .then(dbLakeData => res.json(dbLakeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create lake
router.post('/', (req, res) => {
    Lakes.create({
        name: req.body.name,
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    .then(dbLakeData => res.json(dbLakeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router