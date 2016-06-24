const placeController = require('../controllers/placeController');
const followController = require('../controllers/FollowController');

module.exports = (app) => {
  app.post('/api/users/:id/places', placeController.insertPlace);
  app.post('/api/users/:userId/follows', followController.followUser);
};
