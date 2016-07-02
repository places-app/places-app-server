const placeController = require('../controllers/placeController');
const followController = require('../controllers/followController');
const usersController = require('../controllers/usersController');
const favController = require('../controllers/favsController');
const multer = require('multer');
const upload = multer({ dest: 'dist/videos/' });
const locateController = require('../controllers/locateController');
const userController = require('../controllers/userController');


function ensureAuthenticated(req, res, next) {
  next(); // this line should be removed and the rest should be uncommented later
  // I have commented this out so we can send requests without being logged-in for now
  // if (req.isAuthenticated()) {
  //   console.log('You are authenticated as req.user:', req.user);
  //   return next();
  // }
  // console.log('You dont have access to this route.');
  // return res.redirect('/');
}

module.exports = (app) => {
  // places
  app.get('/api/users/:userId/places', ensureAuthenticated, placeController.getPlaces);
  app.post('/api/users/:userId/places',
    ensureAuthenticated, upload.single('file'),
    placeController.insertPlace
  );

  // users and follows
  app.get('/api/users/:userId/follows', ensureAuthenticated, followController.getFollows);
  app.post('/api/users/:userId/follows', ensureAuthenticated, followController.followUser);
  app.get('/api/follows/:followedId/places', ensureAuthenticated, followController.getFollowPlaces);
  app.get('/api/users', ensureAuthenticated, usersController.getUsers);

  // favs
  app.get('/api/users/:userId/favs', favController.getAllFavs);
  app.post('/api/users/:userId/favs', favController.insertFav);

  // locate
  app.post('/api/locate', locateController.getLocations);

  // random bot user routes
  app.post('/api/bot/add', userController.addBot);
  app.post('/api/bot/delete', userController.deleteBot);
};
