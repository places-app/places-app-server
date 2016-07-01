module.exports = {
  getLocations: (req, res) => {
    console.log('FOLLOWS BODY-----------------', req.body);
    res.sendStatus(200);
  },
};
