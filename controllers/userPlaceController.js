const UserPlace = require('../models').userPlace;
const fs = require('fs');
const path = require('path');

module.exports = {
  updateUrl: (req, res) => {
    const userPlaceId = req.body.userPlaceId;
    const videoUrl = req.body.videoUrl;
    let oldUrl;

    console.log('updating userPlace with new url:', req.body);

    // update the video url
    UserPlace.findById(userPlaceId)
      .then((userPlace) => {
        oldUrl = userPlace.videoUrl;
        return new Promise((resolve) =>
          resolve(userPlace.update({ videoUrl }))
        );
      })
      .then(() => {
        const fileName = oldUrl.match(/\/([^/]*)$/)[1];
        const filePath = path.join(`${__dirname}./../dist/videos/${fileName}`);
        // delete file
        fs.unlink(filePath, (err) => {
          if (err) {
            throw new Error(err);
          }
          console.log('video file was deleted.', filePath);
        });
      })
      .catch((err) => {
        throw new Error(err);
      });

    res.sendStatus(200);
    res.end('video url was updated.');
  },
};
