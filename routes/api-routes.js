const Places = require('../models').place;
const UserPlaces = require('../models').userPlaces;

console.log('functions inside API ROUTES:', Places, UserPlaces);


module.exports = (app) => {
  app.post('/api/users/:id/places', (req, res) => {
    const userId = req.params.id;
    const { name, lat, lng } = req.body.location;
    const note = req.body.note;
    console.log('USERID-----------', userId);
    console.log('data coming back from place post--------------', req.body);
    console.log('data is--------------', name, lat, lng, note);

    Places
      .findOrCreate({
        where: { name },
        defaults: { lat, lng },
      })
      .spread((place, created) => {
        console.log(place.get({
          plain: true,
        }));
        console.log(created);
        UserPlaces // --- upsert
          .findOrCreate({
            where: { placeId: place.id },
            defaults: { userId, note, videoUrl: '', pictureUrl: '' },
          })
          .spread((userPlace, created2) => (
            created2 ? res.send(201) : res.send(202)
          ));
      });
    res.send(500);
  });
};
