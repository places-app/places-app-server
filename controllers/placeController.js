const Places = require('../models').place;
const UserPlace = require('../models').userPlace;

module.exports = {
  insertPlace: (req, res) => {
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
        UserPlace // --- upsert
          .findOrCreate({
            where: { placeId: place.id },
            defaults: { userId, note, videoUrl: '', pictureUrl: '' },
          })
          .spread((userPlace, newEntry) => {
            console.log('DID I MAKE IT HERE---------------');
            console.log('newEntry---------------', newEntry);
            return newEntry ? res.send(201) : res.send(202);
          });
      });
  },
  getPlaces: (req, res) => {
    // this will be added
  },
};
