'use strict';
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var postCommands = function(commands, done) {
  if(commands.length < 1) {
    done();
    return;
  }
  
  var apiCommand = commands[0].apiCommand;
  var apiURL = '/api/' + commands[0].apiCommand;
  delete commands[0].apiCommand;
  var req = request(acceptanceUrl);
  req
    .post(apiURL)
    .type('json')
    .send(commands[0])
    .end(function (err, res) {
      if (err) return done(err);
      commands.shift();
      postCommands(commands, done);
    });
}

var userInfo = {
  gameName: "ThirdGame",
  gameId: "1337"
}

/* Fluid API testing */
module.exports = {
  user: function(userName) {
    var command = {};
    var userApi = {
      createsGame: function(gameId, gameName) {
        userInfo.gameId = gameId;
        userInfo.gameName = gameName;
        command = {
          id:         "1",
          gameId:     gameId,
          comm:       "CreateGame",
          userName:   userName,
          name:       gameName,
          timeStamp:  "2015.12.02T11:29:44",
          apiCommand: "createGame"
        };
        return userApi;
      },
      joinsGame: function(gameId) {
        command = {
          id:         "1",
          gameId:     gameId,
          comm:       "JoinGame",
          userName:   userName,
          name:       userInfo.gameName,
          timeStamp:  "2015.12.02T11:29:44",
          apiCommand: "joinGame"
        };
        return userApi;
      },
      placeMove: function(x, y, side) {
        command = {
          id:         "1",
          comm:       "MakeMove",
          userName:   userName,
          name:       userInfo.gameName,
          x:          x,
          y:          y,
          side:       side, 
          gameId:     userInfo.gameId,
          timeStamp:  "2015.12.02T11:29:44",
          apiCommand: "placeMove"
        };
        return userApi;
      },
      givenCommand:function(){
        return command;
      }
    }
    return userApi;
  },

  given: function(given) {    
    var commands = [];
    commands.push(given.givenCommand());
    var expected = {
      id :       commands[0].id,
      gameId :   commands[0].gameId,
      event:     undefined,
      userName:  commands[0].userName,
      name:      commands[0].name, 
      timeStamp: commands[0].timeStamp,
    };
    var givenApi = {
      withName: function(name) {
        expected.name = name;
        return givenApi;
      },
      expect: function(eventName) {
        expected.event = eventName;
        return givenApi;
      },
      byUser: function(user) {
        expected.userName = user;
        return givenApi;
      },
      and: function(userAct) {
        commands.push(userAct.givenCommand());
        return givenApi;
      },
      isOk: function(done) {
        postCommands(commands, function () {
          var apiURL = '/api/gameHistory/' + expected.gameId;

          var req = request(acceptanceUrl);
          request(acceptanceUrl)
            .get(apiURL)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body[res.body.length - 1]).eql(
                {
                  "id":        expected.id,
                  "gameId":    expected.gameId,
                  "event":     expected.event,
                  "userName":  expected.userName,
                  "name":      expected.name,
                  "timeStamp": expected.timeStamp
                });
              done();
            });
        });
      }
    }
    return givenApi;
  }
};