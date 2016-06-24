const Follow = require('../models').follow;

exports.followUser = (req, res) => {
  Follow.create({
    id: 1,
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
};
