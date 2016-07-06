const Follow = require('../models').follow;
const User = require('../models').user;
const UserPlace = require('../models').userPlace;
const Place = require('../models').place;

module.exports = {
  followUser: (req, res) => {
    Follow.findOrCreate({
      where: {
        userId: req.params.userId,
        followedId: req.body.followedId,
      },
      defaults: {
        userId: req.params.userId,
        followedId: req.body.followedId,
        following: true,
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
      }],
      raw: true,
    })
    .spread((follow, created) => {
      if (created) {
        const followRaw = follow.get({
          plain: true,
        });
        console.log(`Successfuly followed user ${followRaw.followedId} for user ${followRaw.userId}`);
        User.find({
          where: {
            id: followRaw.followedId,
          },
          attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
          raw: true,
        })
        .then(followed => {
          res.status(200).send(followed);
        })
        .catch(error => {
          console.log(error);
          res.status(500).send();
        });
      } else {
        const userId = req.params.userId;
        const followedId = req.body.followedId;
        Follow.update({
          following: !req.body.followed,
        }, {
          where: {
            userId,
            followedId,
          },
        })
        .then(result => {
          console.log('Number of rows affected ', result);
          User.find({
            where: {
              id: followedId,
            },
            attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
            raw: true,
          })
          .then(user => {
            let followLog = 'followed';
            if (req.body.followed) {
              followLog = 'unfollowed';
            }
            console.log(`Successfuly ${followLog} user ${user.id} for user ${userId}`);
            res.status(200).send(user);
          })
          .catch(error => {
            // Add error handling and res status
            console.log(error);
          });
        })
        .catch(error => {
          // Add error handling and res status
          console.log(error);
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send();
    });
  },
  getFollows: (req, res) => {
    Follow.findAll({
      where: {
        userId: req.params.userId,
      },
      raw: true,
    })
    .then(follows => {
      const allFollows = [];
      follows.forEach(follow => {
        allFollows.push(follow.followedId);
      });
      User.findAll({
        where: {
          id: allFollows,
        },
        attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
        raw: true,
      })
      .then(followedUsers => {
        console.log(`Successfuly fetched followed users for user ${req.params.userId}`);
        res.status(200).send(followedUsers);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send();
      });
    });
  },
  getFollowPlaces: (req, res) => {
    UserPlace.findAll({
      where: {
        userId: req.params.followedId,
      },
      attributes: ['id', 'userId', 'placeId', 'videoUrl', 'imageUrl', 'note'],
      include: [{
        model: Place,
        attributes: ['name', 'lat', 'lng', 'favsCount', 'pinnedCount'],
      },
      {
        model: User,
        attributes: ['name'],
      }],
      raw: true,
    })
    .then(results => {
      console.log(`Successfuly fetched followed user's places for user ${req.params.followedId}`);
      const data = results.map(result => {
        const entry = {
          userPlaceId: result.id,
          userId: result.userId,
          userName: result['user.name'],
          placeId: result.placeId,
          userImageUrl: result['user.imageUrl'],
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
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send();
    });
  },
};
