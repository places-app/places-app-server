const placeController = require('../controllers/placeController');
const followController = require('../controllers/followController');
const usersController = require('../controllers/usersController');
const favController = require('../controllers/favsController');
const userPlaceController = require('../controllers/userPlaceController');
const locateController = require('../controllers/locateController');
const userController = require('../controllers/userController');

// multer file handling
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'dist/videos');
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, `${raw.toString('hex')}${Date.now()}.mov`);
    });
  },
});
const upload = multer({ storage });

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

  // user places
  app.put('/api/userplaces', userPlaceController.updateUrl);
};
