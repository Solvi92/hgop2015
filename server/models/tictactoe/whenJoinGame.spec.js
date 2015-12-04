var commandHandler = require('./commandHandler');

describe('JoinGame game command', function() {
	var given, when, then;

	it('should join game', function() {
		given = [{
			id: 	   "1",
			event: 	   "GameCreated",
			userName:  "Solvi",
			timeStamp: "2015.12.02T11:29:44"
		}];
		when = {
			id: 	 	"1",
			comm: 	 	"JoinGame",
			userName: 	"Smurf",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:44"
		};
		then = [{
			id: 	   "1",
			event: 	   "GameJoined",
			userName:  "Smurf",
			timeStamp: "2015.12.02T11:30:44"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});