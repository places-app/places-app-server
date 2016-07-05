const axios = require('axios');

// digital ocean deployed IP
const serverUrl = `http://${process.env.LOCATION_HOST}:${process.env.LOCATION_PORT}/api/getLocations`;
// const serverUrl = 'http://104.236.72.252:3333/api/getLocations';


module.exports = {
  getLocations: (req, res) => {
    console.log('serverUrl is: ', serverUrl);
    const basicFollows = req.body.basicFollows;
    console.log('basicFollows is: ', basicFollows);
    axios.post(serverUrl, { basicFollows })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => console.log(error));
  },
};
