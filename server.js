// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const express = require('express');

const app = express();

// apply app to use middleware
require('./config/middleware')(app);

// Auth routes
require('./routes/auth-routes')(app);

// API routes
require('./routes/api-routes')(app);

// Wildcard route
app.get('*', (req, res) => {
  res.send(404);
});

app.listen(Number(process.env.PORT), process.env.HOST, () => {
  console.log(
    `${process.env.APP_NAME} is listening at ${process.env.HOST} on port ${process.env.PORT}`
  );
});
