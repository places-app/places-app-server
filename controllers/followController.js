const Follow = require('../models').follow;
const User = require('../models').user;

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
      })
      .spread((follow, created) => {
        console.log(created);
        console.log(`Successfuly followed user ${follow.followedId} for user ${follow.userId}`);
        res.send(200);
      })
      .catch((error) => {
        // Add error handling and res status
        console.log(error);
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
        console.log(`Successfuly fetched from Follows table for user ${req.params.userId}`);
        res.send(followedUsers);
      })
      .catch((error) => {
        // Add error handling and res status
        console.log(error);
      });
    });
  },
};
