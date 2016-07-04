const UserPlace = require('../models').userPlace;
const Place = require('../models').place;
const api = require('../utils/api');

module.exports = {
  getPlaceDetails: (req, res) => {
    const userId = req.params.userId;
    UserPlace.findAll({
      where: { userId,
      },
      include: [{
        model: Place,
        attributes: ['gPlaceId'],
      }],
      raw: true,
    })
    .then(places => {
      const gPlaceIds = [];
      places.forEach(place => {
        const id = place['place.gPlaceId'];
        if (id) {
          api.getPlaceDetails(id)
          .then(resp => {
            console.log(resp.data.result.types);
          });
          gPlaceIds.push(id);
        }
      });

      console.log(gPlaceIds);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send();
    });
  },
};
