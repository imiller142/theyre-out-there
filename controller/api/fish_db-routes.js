const router = require('express').Router();
const { Fish_db, Fish_Available, Fish_Caught } = require('../../model');

router.get('/', (req, res) => {
    Fish_db.findAll({
    })
    .then(fishData => res.json(fishData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) =>{
    Fish_db.findOne({
        where: {id: req.params.id}
    })
    .then(fishData => res.json(fishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//post new fish to data base expects description, common name, wiki link
router.post('/', (req, res) =>{

    Fish_Available.create({
        fish_db :
            {
            common_name: req.body.common_name,
            description: req.body.description,
            wiki_link: req.body.wiki_link,
        }
    },
    {
        include: ['fish_db']
    }
    )

    .then(fishData => res.json(fishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })

});

router.post('/available', (req, res) => {
    Fish_Available.create({
        name
    })
})

//delete fish
router.delete('/:id', (req, res) => {
    Fish_db.destroy({
        where: {id: req.params.id}
    })
    .then(fishData => res.json(fishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;