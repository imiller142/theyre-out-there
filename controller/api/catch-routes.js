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
  



module.exports = router