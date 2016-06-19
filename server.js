// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

const app = express();

// Configure passport strategy
require('./config/passport')(app);


// Auth routes
require('./routes/auth-routes')(app);

// API routes
require('./routes/api-routes')(app);

// Wildcard route
app.get('*', function(req, res) {
  res.send(404);
});

app.listen(Number(process.env.PORT), process.env.HOST, () => {
  console.log('listening *:' + process.env.PORT);
});
