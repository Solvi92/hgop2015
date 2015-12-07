var commandHandler = require('./commandHandler');

describe('Create game command', function() {
	var given, when, then;

	it('should create game', function() {
		given = [];
		when = {
			id: 	 	"1",
			gameId: 	"999",
			comm: 	 	"CreateGame",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:29:44"
		};
		then = [{
			id: 	   "1",
			gameId: 	"999",
			event: 	   "GameCreated",
			userName:  "Solvi",
			name: 		"FirstGame",
			timeStamp: "2015.12.02T11:29:44"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should create game with another player at diffirent time', function() {
		given = [];
		when = {
			id:     	"2",
			gameId:  	"999", 
			comm:     	"CreateGame",
			userName:   "Smurf",
			name:     	"FirstGame",
			timeStamp:  "2015.12.02T10:29:44"
		};
		then = [{
			id:      	"2",
			gameId: 	"999",
			event:    	"GameCreated",
			userName:   "Smurf",
			name:     	"FirstGame",
			timeStamp:  "2015.12.02T10:29:44"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});