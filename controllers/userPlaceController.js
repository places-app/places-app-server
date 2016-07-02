const UserPlace = require('../models').userPlace;
const fs = require('fs');
const path = require('path');

module.exports = {
  updateUrl: (req, res) => {
    const userPlaceId = req.body.userPlaceId;
    const videoUrl = req.body.videoUrl;
    let oldUrl;

    console.log('req.body', req.body);

    // update the video url
    UserPlace.findById(userPlaceId)
      .then((userPlace) => {
        console.log('db url on db', userPlace.videoUrl);
        // oldUrl = userPlace.videoUrl;
        oldUrl = 'http://10.8.28.176:7000/dist/videos/e1f13e74e4324a23457d738a86c759e8';
        console.log('hard coded url', oldUrl);
        return new Promise((resolve) =>
          resolve(userPlace.update({ videoUrl }))
        );
      })
      .then((updatedUserPlace) => {
        console.log('updated place:', updatedUserPlace);
        const fileName = oldUrl.match(/\/([^/]*)$/)[1];
        const filePath = path.join(`${__dirname}./../dist/videos/${fileName}`);
        // delete file
        fs.unlink(filePath, (err) => {
          if (err) {
            throw new Error(err);
          }
          console.log('Video has been deleted:', filePath);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });

    res.sendStatus(200);
    res.end('video updated...');
  },
};
