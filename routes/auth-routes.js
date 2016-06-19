var express = require('express');
var passport = require('passport');


module.exports = function(app) {
  app.get('/auth/facebook/token',  passport.authenticate('facebook-token'),function(req, res) {
      console.log('User is logged, req.user will be-----------------: ', req.user)

      res.send(200);
  });
}
