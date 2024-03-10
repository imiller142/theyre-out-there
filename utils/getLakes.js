const router = require('express').Router();
const sequelize = require('../config/connection');
const { Lakes, Fish_Available, Fish_db, User, Fish_Caught  } = require('../model');

const getLakes = (req, res, next) => {

        Lakes.findAll({
        })
        .then(dbLakeData => { 
            const lake = dbLakeData.map(lake => lake.get({ plain: true }));
            console.log(lake);
            res.json(lake)
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    };

    module.exports = getLakes;