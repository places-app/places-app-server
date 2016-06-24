const Follow = require('../models').follow;

module.exports = {
  followUser: (req, res) => {
    Follow.create({
      userId: req.params.userId,
      followedId: req.body.followedId,
      following: true,
    })
    .then((follow) => {
      console.log(`Successfuly inserted into Follows table for user ${follow.userId}`);
      res.send(200);
    })
    .catch((error) => {
      console.log(error);
    });
  },
};
