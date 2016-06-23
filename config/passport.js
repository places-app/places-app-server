// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const session = require('express-session');

const userController = require('../controllers/userController');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  userController.getUser(profile.id)
    .then((user) => {
      if (user) {
        return done(null, user.dataValues);
      }
      const newUser = {
        fbId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        imageUrl: profile.photos[0].value,
        accessToken,
        refreshToken,
      };
      return userController.addUser(newUser)
        .then((createdUser) => done(null, createdUser.dataValues))
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
}));

module.exports = function passportConfig(app) {
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'pernicious',
    cookie: { httpOnly: false },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};
