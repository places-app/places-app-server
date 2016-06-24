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
  getLoginPayLoad: function getUser(fbId, cb) {
    return User.findOne({ where: { fbId } })
      .then((user) => {
        if (user) {
          const payLoad = {
            id: user.dataValues.id,
            imageUrl: user.dataValues.imageUrl,
            name: user.dataValues.name,
            repCount: user.dataValues.repCount,
            email: user.dataValues.email,
            currLat: user.dataValues.currLat,
            currLng: user.dataValues.currLng,
            prevLat: user.dataValues.prevLat,
            prevLng: user.dataValues.prevLng,
          };
          cb(payLoad);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
