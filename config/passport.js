const FacebookTokenStrategy = require('passport-facebook-token');
const session = require('express-session');

module.exports = function passportConfig(app, passport) {
  app.use(session({ secret: 'pernicious' }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));

  passport.use(new FacebookTokenStrategy({
    clientID: '1171407722880061',
    clientSecret: '6cde384abc81b47f044b0ee9b1195882',
  }, (accessToken, refreshToken, profile, done) => {
    /** this will be replaced with findOrCreate
    */
    const user = {
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      id: profile.id,
      token: accessToken,
    };
    return done(null, user);
  }));
};
