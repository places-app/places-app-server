// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const Places = require('../models').place;
const UserPlace = require('../models').userPlace;
const User = require('../models').user;
const Follow = require('../models').follow;
const _ = require('lodash');
const axios = require('axios');

module.exports = {
  insertPlace: (req, res) => {
    console.log('REQ.Body--->', req.body);
    const userId = req.params.userId;
    const { name, lat, lng, note, gPlaceId } = req.body;
    console.log('USERID-----------', userId);
    console.log('data coming back from place post--------------', req.body);
    console.log('data is--------------', name, lat, lng, note);
    if (req.file) {
      console.log('REQ FILE--->', req.file);
    }
    let videoUrl = '';
    if (req.file) {
      videoUrl = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}/${req.file.path}`;
    }
    Places
      .findOrCreate({
        where: { name },
        raw: true,
        defaults: { gPlaceId, lat, lng },
      })
      .spread((place, created) => {
        console.log(created);
        UserPlace // --- upsert
          .findOrCreate({
            where: { placeId: place.id, userId },
            defaults: { placeId: place.id, userId, note, videoUrl },
          })
          .spread((userPlace, newEntry) => {
            console.log('BASE URL', process.env.VIDEO_SERVICE);
            // if newEntry && videoUrl
            if (videoUrl) {
              console.log('userPlace ID', userPlace.id);
              console.log('VIDEO URL', videoUrl);
              // send axios get req to video service
              axios({
                url: '/api/videos',
                method: 'post',
                baseURL: process.env.VIDEO_SERVICE,
                withCredentials: true,
                data: {
                  userPlaceId: userPlace.id,
                  videoUrl,
                },
              })
              .then((response) => {
                // console.log('Response from the video service:', response);
              })
              .catch((error) => {
                console.log(error);
              });
            }
            return newEntry ? res.sendStatus(201) : res.sendStatus(202);
          });
      });
  },

  // /api/users/:userId/places return mine and my friends places
  getPlaces: (req, res) => {
    const reqUserId = req.params.userId;
    Follow.findAll({
      where: { userId: reqUserId },
      raw: true, attributes: ['followedId'],
    })
      .then((users) => {
        const followedIds = users.map((obj) => obj.followedId);
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
      .then((results) => {
        const userPlaces = _.flattenDeep(results);
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
