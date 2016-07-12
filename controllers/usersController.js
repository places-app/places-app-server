const db = require('../models');
const User = db.user;
const Follow = db.follow;

module.exports = {
  getUsers: function getUsers(req, res) {
    let userId;
    if (req.user) {
      userId = req.user.id;
    } else {
      userId = process.env.GUEST_ID;
    }
    return Follow.findAll({
      attributes: ['followedId'],
      where: {
        userId,
      },
      raw: true,
    })
    .then((userFollows) => {
      const ids = userFollows.map((user) => user.followedId);
      ids.push(userId);
      const query = {
        attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
        where: {
          id: {
            $notIn: ids,
          },
        },
        raw: true,
      };
      return new Promise((resolve) =>
        resolve(User.findAll(query)
      ));
    })
    .then((otherUsers) => {
      res.send(otherUsers);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  },
};
