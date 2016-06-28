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
        raw: true,
      })
      .spread((follow, created) => {
        if (created) {
          const followRaw = follow.get({
            plain: true,
          });
          console.log(`Successfuly followed user ${followRaw.followedId} 
            for user ${followRaw.userId}`);
          res.status(200).send(followRaw);
        } else {
          console.log(`Successfuly followed user ${follow.followedId} for user ${follow.userId}`);
          res.status(200).send(follow);
        }
      })
      .catch((error) => {
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
    .then((follows) => {
      const allFollows = [];
      follows.forEach((follow) => {
        allFollows.push(follow.followedId);
      });
      User.findAll({
        where: {
          id: allFollows,
        },
        attributes: ['id', 'name', 'currLat', 'currLng', 'prevLat', 'prevLng', 'repCount'],
        raw: true,
      })
      .then((followedUsers) => {
        console.log(`Successfuly fetched followed users for user ${req.params.userId}`);
        res.status(200).send(followedUsers);
      })
      .catch((error) => {
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
      attributes: ['videoUrl', 'imageUrl', 'note'],
      include: [{
        model: Place,
        attributes: ['id', 'name', 'lat', 'lng', 'favsCount', 'pinnedCount'],
      }],
      raw: true,
    })
    .then((places) => {
      console.log(`Successfuly fetched followed user's places for user ${req.params.followedId}`);
      res.status(200).send(places);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
  },
};
