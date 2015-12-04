var commandHandler = require('./commandHandler');

describe('Create game command', function() {
	var given, when, then;

	it('should create game', function() {
		given = [];
		when = {
			id: 	 	"1",
			comm: 	 	"CreateGame",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:29:44"
		};
		then = [{
			id: 	   "1",
			event: 	   "GameCreated",
			userName:  "Solvi",
			timeStamp: "2015.12.02T11:29:44"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});