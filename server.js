// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const express = require('express');

const app = express();

// API routes
require('./routes/api-routes')(app);

app.listen(Number(process.env.PORT), process.env.HOST, () => {
  console.log('listening *:' + process.env.PORT);
});
