var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');


module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new FacebookTokenStrategy({
        clientID: '1171407722880061',
        clientSecret: '6cde384abc81b47f044b0ee9b1195882'
      }, function(accessToken, refreshToken, profile, done) {
          /** this will be replaced with findOrCreate
          */
          var user = {
            'email': profile.emails[0].value,
            'name' : profile.name.givenName + ' ' + profile.name.familyName,
            'id'   : profile.id,
            'token': accessToken
          }
          return done(null, user);
      }
    ));

};