// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const axios = require('axios');

const serverUrl = 'https://maps.googleapis.com/maps';
const placeId = '?placeid=';
const key = `&key=${process.env.PLACES_KEY}`;

module.exports = {
  getPlaceDetails(gPlaceId) {
    return axios({
      url: `/api/place/details/json${placeId}${gPlaceId}${key}`,
      method: 'get',
      baseURL: serverUrl,
      withCredentials: true,
    });
  },
};
