var user = require('../acceptance/fluidAPIFunctions.acceptance.js').user;
var given = require('../acceptance/fluidAPIFunctions.acceptance.js').given;

it('Should play 400 games under 9.2 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 500;
  var x = 23;

  this.timeout(x * 400);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user("TestUserOne").createsGame("" + gameId, "gamenr" + gameId))
     .and(user("TestUserTwo").joinsGame("" + gameId))
     .and(user("TestUserOne").placeMove(0,0,"X"))
     .and(user("TestUserTwo").placeMove(1,0,"O"))
     .and(user("TestUserOne").placeMove(2,0,"X"))
     .and(user("TestUserTwo").placeMove(0,1,"O"))
     .and(user("TestUserOne").placeMove(1,1,"X"))
     .and(user("TestUserTwo").placeMove(2,2,"O"))
     .and(user("TestUserOne").placeMove(1,2,"X"))
     .and(user("TestUserTwo").placeMove(0,2,"O"))
     .and(user("TestUserOne").placeMove(2,1,"X"))
      .expect("Draw").isOk(QED);
  }
});