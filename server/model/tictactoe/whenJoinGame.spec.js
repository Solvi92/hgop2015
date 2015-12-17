var commandHandler = require('./commandHandler');

describe('JoinGame game command', function() {
	var given, when, then;

	it('should join game', function() {
		given = [{	
			id: 	   "1",
      gameId:   "111",
			event: 	   "GameCreated",
			userName:  "Solvi",
			timeStamp: "2015.12.02T11:29:44"
		}];
		when = {
			id: 	 	  "1",
      gameId:   "111",
			comm: 	 	"JoinGame",
			userName: 	"Smurf",
      side:     "O",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:44"
		};
		then = [{
			id: 	   		"1",
      gameId:     "111",
			event: 	   		"GameJoined",
			userName:  		"Smurf",
			otherUserName: 	"Solvi",
			timeStamp: 		"2015.12.02T11:30:44"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should reject joining of a non-existing game', function() {
		given = [];
		when = {
			id: "1",
      gameId: "1112",
			comm: "JoinGame",
			userName: "Solvi",
      side: 'O',
			name: "FirstGame",
			timeStamp: "2015.12.02T11:30:55"
		};
		then = [{
			id: "1",
			event: "GameDoesNotExist",
			userName: "Solvi",
			timeStamp: "2015.12.02T11:30:55"
		}];

		var actualEvents = commandHandler(given). executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});