const placeController = require('../controllers/placeController');
const followController = require('../controllers/followController');

module.exports = (app) => {
  app.get('/api/users/:userId/places', placeController.getPlaces);
  app.post('/api/users/:id/places', placeController.insertPlace);
  app.post('/api/users/:userId/follows', followController.followUser);
  app.get('/api/users/:userId/follows', followController.getFollows);
};
