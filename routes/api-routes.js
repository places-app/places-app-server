const placeController = require('../controllers/placeController');
const followController = require('../controllers/followController');
const usersController = require('../controllers/usersController');
const favController = require('../controllers/favsController');
const multer = require('multer');
const upload = multer({ dest: 'dist/videos/' });

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
  // app.post('/api/users/:userId/places', ensureAuthenticated, placeController.insertPlace);
  app.post('/api/users/:userId/places',
    ensureAuthenticated, upload.single('file'),
    placeController.insertPlace
  );

  // app.post('/profile', upload.single('avatar'), function (req, res, next) {
  //   // req.file is the `avatar` file
  //   // req.body will hold the text fields, if there were any
  // });
  // users and follows
  app.get('/api/users/:userId/follows', ensureAuthenticated, followController.getFollows);
  app.post('/api/users/:userId/follows', ensureAuthenticated, followController.followUser);
  app.get('/api/follows/:followedId/places', ensureAuthenticated, followController.getFollowPlaces);
  app.get('/api/users', ensureAuthenticated, usersController.getUsers);
  app.post('/api/users/:userId', ensureAuthenticated, usersController.updateLocation);

  // favs
  app.get('/api/users/:userId/favs', favController.getAllFavs);
  app.post('/api/users/:userId/favs', favController.insertFav);
};
