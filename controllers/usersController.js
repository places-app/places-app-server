const db = require('../models');
const User = db.user;
const Follow = db.follow;

module.exports = {
  getUsers: function getUsers(req, res) {
    const userId = 3//req.user.id;
    console.log(userId);
    // console.log(req.params)
    // res.send(200);
    return Follow.findAll({
        attributes: ['followedId'],
        where: {
          userId,
        },
        raw: true,
      })
      .then((userFollows) => {
        if (userFollows) {
          console.log(userFollows);

          let ids = userFollows.map((user) => user.followedId);
          ids.push(userId);
          

          return User.findAll({
            attributes: ['id', 'email', 'name', 'imageUrl', 'repCount'],
            where: {
              id: {
                $notIn: ids,
              },
            },
            raw: true,
          })
          .then((otherUsers) => {
            console.log(otherUsers);
          })

          return user;
        }
        return false; // res send error
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  addUser: function addUser(user) {
    return User.create(user)
      .then((createdUser) => createdUser)
      .catch((err) => {
        throw new Error(err);
      });
  },
  getLoginPayLoad: function getUser(req, res) {
    const fbId = req.user.fbId;
    return User.findOne({ where: { fbId }, raw: true })
      .then((user) => {
        if (user) {
          const payLoad = {
            id: user.id,
            imageUrl: user.imageUrl,
            name: user.name,
            repCount: user.repCount,
            email: user.email,
            currLat: user.currLat,
            currLng: user.currLng,
            prevLat: user.prevLat,
            prevLng: user.prevLng,
          };
          res.end(JSON.stringify(payLoad));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};