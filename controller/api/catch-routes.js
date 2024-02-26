const router = require('express').Router();
const { Lakes, Fish_Available, Fish_db, Fish_Caught } = require('../../model');


router.get('/', (req, res) => {
  Fish_Caught.findAll({
    order: [['created_at', 'DESC']]
  })
  .then(dbCatchData => res.json(dbCatchData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});



router.put('/', (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Fish_Caught.ascFishLake({ ...req.body, user_id: req.session.user_id }, { Fish_db, Fish_Available, Lakes })
        .then(updatedFishData => res.json(updatedFishData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
  
//this will create a new catch linked to a user and create all links between data basses if needed for new lakes and new fish
// TODO: auth

router.post('/', (req,res) => {
  Fish_Caught.create({
    species : req.body.species,
    length: req.body.length,
    weight: req.body.weight,
    //Todo update to session auth
    user_id: req.body.user_id,
    lake_id: req.body.lake_id,
    fish_id: req.body.fish_id
  })
  .then(Fish_Caught.ascFishLake({...req.body}, {Fish_db, Fish_Available, Lakes }))
  .then(updatedFishData => res.json(updatedFishData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})



module.exports = router