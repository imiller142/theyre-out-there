const router = require('express').Router();
const { Lakes, Fish_Available, Fish_Caught, Fish_db } = require('../../model');

router.get('/', (req, res) => {
    Fish_Available.findAll({
    })
    .then(dbLakeData => res.json(dbLakeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
