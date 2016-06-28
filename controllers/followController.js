const Follow = require('../models').follow;
const User = require('../models').user;
const UserPlace = require('../models').userPlace;
const Place = require('../models').place;

module.exports = {
  followUser: (req, res) => {
    // add unfollow
    if (!req.body.followed) {
      Follow.findOrCreate({
        where: {
          userId: req.params.userId,
          followedId: req.body.followedId,
          following: true,
        },
        // only for find <-- remove
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'currLat', 'currLng',
          'prevLat', 'prevLng', 'repCount'],
        }],
        // only for find
        raw: true,
      })
      .spread((follow, created) => {
        if (created) {
          const followRaw = follow.get({
            plain: true,
          });
          console.log(`Successfuly followed user ${followRaw.followedId} 
            for user ${followRaw.userId}`);
          User.find({
            where: {
              id: followRaw.followedId,
            },
            attributes: ['id', 'name', 'currLat', 'currLng',
            'prevLat', 'prevLng', 'repCount'],
            raw: true,
          })
          .then(followed => {
            res.status(200).send(followed);
          })
          .catch(error => {
            console.log(error);
            res.status(500).send();
          });
        // only for find <-- remove when unfollow is implemented
        } else {
          console.log(`Successfuly followed user ${follow.followedId} for user ${follow.userId}`);
          console.log(follow);
          res.status(200).send(follow);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send();
      });
    } else {
      // Follow.update({
      //   following: false,
      //   where: {
      //     userId: req.params.userId,
      //     followedId: req.body.followedId,
      //     following: true,
      //   },
      // })
      // .then((unfollow) => {
      //   console.log(`Successfuly unfollowed user ${unfollow.followedId}
      //     for user ${unfollow.userId}`);
      //   res.send(200);
      // })
      // .catch((error) => {
      //   // Add error handling and res status
      //   console.log(error);
      // });
    }
  },
  getFollows: (req, res) => {
    Follow.findAll({
      where: {
        userId: req.params.userId,
        following: true,
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
        attributes: ['id', 'name', 'currLat', 'currLng', 'prevLat', 'prevLng', 'repCount'],
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
