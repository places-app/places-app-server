const placeController = require('../controllers/placeController');

module.exports = (app) => {
  app.post('/api/users/:id/places', placeController.insertPlace);
};
