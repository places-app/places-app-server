const axios = require('axios');

// digital ocean deployed IP
const serverUrl = 'http://162.243.137.169:3333/api/getLocations';

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
