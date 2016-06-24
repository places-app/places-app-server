const userController = require('../controllers/userController');
const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    userController.getLoginPayLoad(req.user.fbId, payLoad => {
      res.send(payLoad);
    });
  });
  app.get('/logout', (req, res) => {
    console.log('Logging out...: ');
    req.session.destroy();
    res.sendStatus(200);
  });
};
