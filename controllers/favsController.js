const Favs = require('../models').fav;


module.exports = {
  insertFav: (req, res) => {
    const userId = req.params.userId;
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
    const userId = req.params.userId;
    console.log('USER ID-----------', userId);
    Favs.
      findAll({
        where: { userId, starred: 't' }, raw: true,
      })
      .then(results => {
        console.log('User Favs:', results);
        const resultArray = results.map(fav => ({ userPlaceId: fav.userPlaceId }));
        res.send(resultArray);
      });
  },
};
