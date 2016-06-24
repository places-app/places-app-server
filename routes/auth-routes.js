const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    console.log('User is logged in...', req.user);
    res.sendStatus(200);
  });
  app.get('/logout', (req, res) => {
    console.log('Logging out...: ');
    req.session.destroy();
    res.sendStatus(200);
  });
};
