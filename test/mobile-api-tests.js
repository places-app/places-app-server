const chai = require('chai');
const expect = chai.expect;
chai.should();
let request = require('supertest');
require('dotenv').config({ path: './env/development.env' });
// required db code here... var db = 

const appUrl = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
request = request(appUrl);


describe('Routing', function() {
  
  before(function(done) {
    //create the test data 
    // In our tests we ue the test db
    //mongoose.connect(config.db.mongodb);              
    done();
  });

  after(function(done) {
    //delete the test data 
    done()
  });

  describe('Post places', function() {
    it('should send back a 400 for incomplete info', function(done) {
      let post = {
        location: { name: 'Adam Lessen\'s Delicious Burgers', lat: 40, lng: 50 },
        note: '',
      };
   
      request
        .post('/api/users/1/places')
        .send(post)
          // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(400);
          // query data base to see if that entry exists and verify that the name is the name
          done();
        });
    });

    it('should store a new place and send back a 201', function(done) {
      let post = {
        location: { name: 'Adam Lessen\'s Delicious Burgers', lat: 40, lng: 50 },
        note: 'OMG so gooood!!!!',
      };
   
      request
        .post('/api/users/1/places')
        .send(post)
          // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(201);
          // query data base to see if that entry exists and verify that the name is the name
          done();
        });
    });

    it('should update an existing place and send back a 202', function(done) {
      let post = {
        location: { name: 'Adam Lessen\'s Delicious Burgers', lat: 40, lng: 50 },
        note: 'Friez were the bomb!!!!',
      };
    
      request
        .post('/api/users/1/places')
        .send(post)
          // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(202);
          // query data base to see there is only 1 entry with that place id
          // query to make sure the place got updated 
          done();
        });
    });
