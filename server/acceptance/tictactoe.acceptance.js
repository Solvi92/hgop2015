'use strict';
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var faf = require('./fluidAPIFunctions.acceptance.js');

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    acceptanceUrl.should.be.ok;
  });
  
  it('should execute same test using old style', function (done) {

    var command = {
      id : "2",
      gameId : "666",
      comm: "CreateGame",
      userName: "Solvi",
      name: "FirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/666')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "2",
                "gameId": "666",
                "event": "GameCreated",
                "userName": "Solvi",
                "name": "FirstGame",
                "timeStamp": "2015.12.02T11:29:44"
              }]);
            done();
          });
      });
  });
  
  /* Run the Fluid API tests */
  it('Should execute fluid API test', function (done) {
    faf.given(faf.user("YourUser").createsGame("222", "SecondGame"))
    .expect("GameCreated").withName("SecondGame").isOk(done);
  });

  it('Should play game until won or drawn', function (done) {
     faf.given(faf.user("Solvi").createsGame("1337", "ThirdGame"))
       .and(faf.user("Gulli").joinsGame("1337"))
       .and(faf.user("Solvi").placeMove(0,0,"X"))
       .and(faf.user("Gulli").placeMove(1,0,"O"))
       .and(faf.user("Solvi").placeMove(2,0,"X"))
       .and(faf.user("Gulli").placeMove(0,1,"O"))
       .and(faf.user("Solvi").placeMove(1,1,"X"))
       .and(faf.user("Gulli").placeMove(2,1,"O"))
       .and(faf.user("Solvi").placeMove(0,2,"X"))
       
     .expect("X Won").byUser("Solvi").isOk(done);
   });
});