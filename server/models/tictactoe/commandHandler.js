var _ = require('lodash');

module.exports = function commandHandler(events) {
	var gameState = {
		gameCreatedEvent : events[0],
		board : [["", "", "",], ["", "", ""], ["", "", ""]]
	};

	var eventHandlers = {
		"MoveMade" : function(event) {
			gameState.board[event.x][event.y] = event.side;
		}
	};

	_.each(events, function(event) {
		var eventHandler = eventHandlers[event.event];
		if(eventHandler){
			eventHandler(event);
		}
	});

	var handlers =  {
		"CreateGame" : function (cmd) {
			{
				return [{
					id: 		cmd.id,
					event: 		"GameCreated",
					userName: 	cmd.userName,
					timeStamp: 	cmd.timeStamp
				}];
			}
		}
	};

	return {
		executeCommand: function (cmd) {
			return handlers[cmd.comm](cmd);
		}
	};
};