const Favs = require('../models').fav;


module.exports = {
  insertFav: (req, res) => {
    const userId = req.param('userId');
    const { userPlaceId, placeId } = req.body;
    console.log('----------------------------', userId, userPlaceId, placeId);
    Favs
      .findOrCreate({
        where: { placeId, userId },
        defaults: { userPlaceId, starred: 't' },
      })
      .spread((fav, created) => { if (created) { res.send(201); } else { res.send(202); } });
  },
  getAllFavs: (req, res) => {
    const userId = req.param('userId');
    console.log('USER ID-----------', userId);
    Favs.
      findAll({
        where: { userId, starred: 't' },
      })
      .then(results => {
        console.log('results is: ', results[0].userId);
        const resultObj = results.map(fav => ({ userPlaceId: fav.userPlaceId }));
        res.send(resultObj);
      });
  },
};
