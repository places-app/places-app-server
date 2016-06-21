module.exports = (app) => {
  app.post('/api/users/:id/places', (req, res) => {
    const userId = req.params.id;
    const { name, lat, lng } = req.body.location;

    console.log('USERID-----------', userId);
    console.log('data coming back from place post--------------', req.body);
    console.log('data is--------------', name, lat, lng);
    /**
      Places
        .findOrCreate({where: {name: name}, defaults: {lat: lat, lng: lng})
        .spread(function(place, created) {
          console.log(place.get({
            plain: true
          }))
          console.log(created)
          UserPlaces --- upsert 
            .findOrCreate({where: {placeId:place.id}, defaults: {userId: userId, note:req.body.note, videoUrl:'', pictureUrl: ''}
            .spread(function(userPlace, created) {
              res.send(201)
            })
  res.send(202)
        })

    */
    res.send(200);
  });
};
