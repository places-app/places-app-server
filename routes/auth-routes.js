const userController = require('../controllers/userController');
const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    userController.getLoginPayload
  );
  app.get('/guest', userController.getLoginPayload);
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });
};
