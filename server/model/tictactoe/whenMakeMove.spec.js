var commandHandler = require('./commandHandler');

describe('make move game command', function() {
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

	describe('on new game', function() {
		it('should make a move', function() {
			when = {
				id: 		"1",
				comm: 		"MakeMove",
				userName: 	"Solvi",
				x: 			0,
				y: 			0,
				side: 		"X",
				timeStamp: 	"2015.12.02T11:30:50"
			};
			then = [{
				id: 		"1",
				event: 		"MoveMade",
				userName: 	"Solvi",
				name: 		"FirstGame",
				x: 			0,
				y: 			0,
				side: 		"X",
				timeStamp: 	"2015.12.02T11:30:50"
			}];
	
			var actualEvents = commandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});

		it('should reject a move in a occupied place', function() {
			given.push({
				id: 		"1",
				event: 		"MoveMade",
				userName: 	"Solvi",
				name: 		"FirstGame",
				x: 			0,
				y: 			0,
				side: 		"X",
				timeStamp: 	"2015.12.02T11:30:50"
			});
			when = {
				id: 		"1",
				comm: 		"MakeMove",
				userName: 	"Solvi",
				x: 			0,
				y: 			0,
				side: 		"O",
				timeStamp: 	"2015.12.02T11:30:50"
			}; 
			then = [{
				id: 		"1",
				event: 		"IllegalMove",
				userName: 	"Solvi",
				name: 		"FirstGame",
				x: 			0,
				y: 			0,
				side: 		"O",
				timeStamp: 	"2015.12.02T11:30:50"
			}];

			var actualEvents = commandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});

		it('should reject a move if O tries to be first', function() {
			when = {
				id: 		"1",
				comm: 		"MakeMove",
				userName: 	"Smurf",
				x: 			0,
				y: 			1,
				side: 		"O",
				timeStamp: 	"2015.12.02T11:30:50"
			};
			then = [{
				id: 		"1",
				event: 		"IllegalMove",
				userName: 	"Smurf",
				name: 		"FirstGame",
				x: 			0,
				y: 			1,
				side: 		"O",
				timeStamp: 	"2015.12.02T11:30:50"
			}];

			var actualEvents = commandHandler(given).executeCommand(when);
			JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
		});
	});
});