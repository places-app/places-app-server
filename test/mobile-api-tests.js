const chai = require('chai');
const expect = chai.expect;
chai.should();
let request = require('supertest');
require('dotenv').config({ path: './env/development.env' });
const db = require('../models');

const appUrl = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
request = request(appUrl);


describe('Routing', function () {
  before(function (done) {
    // create the test data
    const name = 'Adam Lessen\'s Delicious Burgers';
    const userId = 1;
    const lng = 50;
    const lat = 40;
    db.place
      .findOrCreate({
        where: { name },
        raw: true,
        defaults: { lat, lng },
      })
      .spread((place) => {
        return db.userPlace // --- upsert
          .destroy({
            where: {
              placeId: place.id,
              userId,
            },
          })
        .then(function (affectedRows) {
          console.log('Deleted rows before: ', affectedRows);
          done();
        })
        .catch(done);
      });
  });

  after(function (done) {
    // delete the test data

    const name = 'Adam Lessen\'s Delicious Burgers';
    const userId = 1;
    db.place
      .findOne({
        where: { name },
      })
      .then(function (place) {
        return db.userPlace.destroy({
          where: {
            placeId: place.id,
            userId,
          },
        });
      })
      .then(function (affectedRows) {
        console.log('Deleted rows after: ', affectedRows);
        done();
      })
      .catch(done);
  });

  describe('Post places', function () {
    let post = { name: 'Adam Lessen\'s Delicious Burgers',
    lat: 40, lng: 50, note: 'OMG so gooood!!!!' };

    it('should send back a 201 for a new place', function (done) {
      request
        .post('/api/users/1/places')
        .send(post)
          // end handles the response
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.equal(201);
          done();
        });
    });

    it('new place should be stored in userPlaces with the correct note', function (done) {
      // query data base to see if entry exists and verify note and uniqueness
      db.place
        .findOne({
          where: { name: post.name },
        })
        .then(function (place) {
          return db.userPlace.findAll({
            where: { placeId: place.id },
          });
        })
        .then(function (places) {
          places.should.have.length(1);
          places[0].note.should.equal('OMG so gooood!!!!');
          done();
        })
        .catch(done);
    });

    it('should send back 202 if user has already pinned place', function (done) {
      post = {
        name: 'Adam Lessen\'s Delicious Burgers', lat: 40, lng: 50,
        note: 'Friez were the bomb!!!!',
      };
      request
        .post('/api/users/1/places')
        .send(post)
          // end handles the response
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.equal(202);
          done();
        });
    });
  });
});
