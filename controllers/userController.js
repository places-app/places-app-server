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
};
