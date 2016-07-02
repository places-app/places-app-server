const axios = require('axios');

const serverUrl = 'http://10.8.28.177:3333/api/getLocations';

module.exports = {
  getLocations: (req, res) => {
    const basicFollows = req.body.basicFollows;
    console.log('FOLLOWS BODY-----------------', basicFollows);
    axios.post(serverUrl, { basicFollows })
    .then(response => {
      console.log('RESPONSE FROM LOCATION SERVER--------', response.data);
      res.send(response.data);
    })
    .catch(error => console.log(error));
  },
};
