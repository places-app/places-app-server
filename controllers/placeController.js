const Places = require('../models').place;
const UserPlace = require('../models').userPlace;
const User = require('../models').user;
const Follow = require('../models').follow;
const _ = require('lodash');

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

  // /api/users/:userId/places return mine and my friends places
  getPlaces: (req, res) => {
    const reqUserId = req.params.userId;
    let followedIds = [];
    return Follow.findAll({
      where: { userId: reqUserId },
      raw: true, attributes: ['followedId'],
    })
      .then((data) => {
        // get all followedIds
        followedIds = data.map((obj) => obj.followedId);
        // add current usersId
        followedIds.push(parseInt(reqUserId, 10));

        const promiseFuncs = followedIds.map((userId) => {
          const query = {
            where: { userId }, raw: true,
            attributes: ['userId', 'placeId'],
          };
          return UserPlace.findAll(query);
        });

        return Promise.all(promiseFuncs);
      })
      .then((result) => {
        const userPlaces = _.flattenDeep(result);
        const promiseFuncs = userPlaces.map((userPlace) => {
          const query = {
            include: [{
              model: User,
              where: { id: userPlace.userId },
            }, {
              model: Places,
              where: { id: userPlace.placeId },
            }],
            raw: true,
          };
          return UserPlace.findOne(query);
        });
        return Promise.all(promiseFuncs);
      })
      .then((results) => {
        const data = results.map((result) => {
          const entry = {
            userPlaceId: result.id,
            userId: result.userId,
            userName: result['user.name'],
            placeId: result.placeId,
            name: result['place.name'],
            lat: result['place.lat'],
            lng: result['place.lng'],
            favsCount: result['place.favsCount'],
            pinnedCount: result['place.pinnedCount'],
            videoUrl: result.videoUrl,
            imageUrl: result.imageUrl,
            note: result.note,
          };
          return entry;
        });
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
