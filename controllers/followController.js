const Follow = require('../models').follow;
const User = require('../models').user;

module.exports = {
  followUser: (req, res) => {
    // add unfollow
    Follow.findOrCreate({
      where: {
        userId: req.params.userId,
        followedId: req.body.followedId,
        following: true,
      },
    })
    .then((follow) => {
      console.log(`Successfuly inserted into Follows table for user ${follow.userId}`);
      res.send(200);
    })
    .catch((error) => {
      // Add error handling and res status
      console.log(error);
    });
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
