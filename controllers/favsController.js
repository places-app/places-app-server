const Favs = require('../models').fav;


module.exports = {
  insertFav: (req, res) => {
    // will have: req.body.
    // needs to have userPlaceId, placeId, userId is on params
    const userId = req.param('userId');
    const { userPlaceId, placeId } = req.body;
    // Favs.findOrCreate({where placeId})
    // consider upsert for setting starred to false
    Favs
      .findOrCreate({
        where: { placeId, userId },
        defaults: { userPlaceId, starred: 't' },
      })
      .spread((fav, created) => created ? res.send(201) : res.send(202));
  },
  getAllFavs: (req, res) => {
    const userId = req.param('userId');
    console.log('USER ID-----------', userId);
    Favs.
      findAll({
        where: { userId, starred:'t' },
      })
      .then(results => {
        console.log('results is: ', results[0].userId);
        resultObj = results.map(fav=>({userPlaceId:fav.userPlaceId}));
        res.send(resultObj);
      });
  },
};
