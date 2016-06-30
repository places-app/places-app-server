const db = require('../models');
const User = db.user;

module.exports = {
  getUser: function getUser(fbId) {
    return User.findOne({ where: { fbId } })
      .then((user) => {
        if (user) {
          return user;
        }
        return false;
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
  getLoginPayload: function getLoginPayload(req, res) {
    const fbId = req.user.fbId;
    User.findOne({ where: { fbId }, raw: true })
      .then((user) => {
        if (user) {
          const payload = {
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
          res.end(JSON.stringify(payload));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  addBot: (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const repCount = req.body.repCount;

    const user = {
      email,
      name,
      imageUrl,
      repCount,
    };

    return User.create(user)
      .then((createdUser) => res.send(JSON.stringify(createdUser.id)))
      .catch((err) => {
        throw new Error(err);
      });
  },
  deleteBot: (req, res) => {
    const userId = req.body.userId;
    console.log('userID: ', userId)
    return User.destroy({
      where: {
        id: userId,
      },
    })
    .then(() => {
      res.sendStatus(200);
    });
  },
};
