const userController = require('../controllers/userController');
const passport = require('passport');

module.exports = (app) => {
  app.get('/api/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    userController.getLoginPayLoad(req, res);
  });
  app.get('/logout', (req, res) => {
    console.log('Logging out...: ');
    req.session.destroy();
    res.sendStatus(200);
  });
};
