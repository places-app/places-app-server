// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const path = require('path');
const express = require('express');
const app = express();
const db = require('../models');

// apply app to use middleware
require('../config/middleware')(app);

// Auth routes
require('../routes/auth-routes')(app);

// API routes
require('../routes/api-routes')(app);

// Test route for session logging
app.get('/test', (req, res) => {
  console.log(req.user);
  res.send('done').end();
});

app.use('/dist', express.static(path.join(`${__dirname}./../dist`)));

// Wildcard route
app.get('*', (req, res) => {
  res.sendStatus(404);
});

function startApp() {
  app.listen(Number(process.env.PORT), process.env.HOST, () => {
    console.log(
      `${process.env.APP_NAME} is listening at ${process.env.HOST} on port ${process.env.PORT}`
    );
  });
}
// Sync DB Models then Start App
db.sequelize.sync()
  .then(startApp)
  .catch((e) => {
    throw new Error(e);
  });
