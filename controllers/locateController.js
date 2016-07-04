const axios = require('axios');

// digital ocean deployed IP
const serverUrl = `http://${process.env.LOCATION_HOST}:${process.env.LOCATION_PORT}/api/getLocations`;

module.exports = {
  getLocations: (req, res) => {
    const basicFollows = req.body.basicFollows;
    axios.post(serverUrl, { basicFollows })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => console.log(error));
  },
};
