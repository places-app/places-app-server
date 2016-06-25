const User = require('../models').user;

module.exports = {
  getUser: (fbId) => {
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
  addUser: (user) => {
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
