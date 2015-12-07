var commandHandler = require('./commandHandler');

describe('won game command', function() {
	var given, when, then;

	beforeEach(function() {
		given = [{
			id: 		"1",
			event: 		"GameCreated",
			name:  		"FirstGame",
			userName: 	"Solvi",
			timeStamp: 	"2015.12.02T11:29:44"
		}, 
		{
			id: 			"1",
			event: 			"GameJoined",
			userName:  		"Smurf",
			otherUserName: 	"Solvi",
			timeStamp: 		"2015.12.02T11:30:50"
		}];
	});

	it('should win horizontaly', function() {
		given.push({
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			1,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		});
		
		when = {
			id: 		"1",
			comm: 		"MakeMove",
			userName: 	"Solvi",
			x: 			1,
			y: 			2,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		};
		then = [{
			id: 		"1",
			event: 		"X Won",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:50"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should win diagonaly', function() {
		given.push({
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		});
		
		when = {
			id: 		"1",
			comm: 		"MakeMove",
			userName: 	"Solvi",
			x: 			2,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		};
		then = [{
			id: 		"1",
			event: 		"X Won",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:50"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should win verticaly', function() {
		given.push({
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			1,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		});
		
		when = {
			id: 		"1",
			comm: 		"MakeMove",
			userName: 	"Solvi",
			x: 			2,
			y: 			2,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		};
		then = [{
			id: 		"1",
			event: 		"X Won",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:50"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should win verticaly in the other direction', function() {
		given.push({
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			2,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			1,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		});
		
		when = {
			id: 		"1",
			comm: 		"MakeMove",
			userName: 	"Solvi",
			x: 			2,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		};
		then = [{
			id: 		"1",
			event: 		"X Won",
			userName: 	"Solvi",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:50"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});

	it('should draw', function() {
		given.push({
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			0,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			2,
			y: 			0,
			side: 		"O",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			1,
			side: 		"O",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			1,
			side: 		"O",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			2,
			y: 			1,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			0,
			y: 			2,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		},
		{
			id: 		"1",
			event: 		"MoveMade",
			userName: 	"Solvi",
			name: 		"FirstGame",
			x: 			1,
			y: 			2,
			side: 		"O",
			timeStamp: 	"2015.12.02T11:30:50"
		});
		
		when = {
			id: 		"1",
			comm: 		"MakeMove",
			userName: 	"Solvi",
			x: 			2,
			y: 			2,
			side: 		"X",
			timeStamp: 	"2015.12.02T11:30:50"
		};
		then = [{
			id: 		"1",
			event: 		"Draw",
			name: 		"FirstGame",
			timeStamp: 	"2015.12.02T11:30:50"
		}];

		var actualEvents = commandHandler(given).executeCommand(when);
		JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
	});
});