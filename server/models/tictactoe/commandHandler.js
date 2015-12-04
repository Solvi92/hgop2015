var _ = require('lodash');

module.exports = function commandHandler(events) {
	var gameState = {
		gameCreatedEvent : events[0],
		board : [["", "", ""], ["", "", ""], ["", "", ""]]
		firstMoveMade = false;
	};

	var eventHandlers = {
		"MoveMade" : function(event) {
			gameState.board[event.x][event.y] = event.side;
		}
		gameState.firstMoveMade = true;
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
		},
		"JoinGame" : function (cmd) {
			{
				if (gameState.gameCreatedEvent === undefined) {
					return [{
						id: 	    	cmd.id,
						event: 			"GameDoesNotExist",
						userName:   	cmd.userName,
						timeStamp:  	cmd.timeStamp
					}];	
				}
				return [{
					id: 	    	cmd.id,
					event: 			"GameJoined",
					userName:   	cmd.userName,
					otherUserName: 	gameState.gameCreatedEvent.userName,
					timeStamp:  	cmd.timeStamp
				}];
			}
	    },
	    "MakeMove" : function (cmd) {
			if(gameState.board[cmd.x][cmd.y] !== "" ||
				(cmd.side = "O" && !gameState.firstMoveMade)) {
				return [{
					id: 		cmd.id,
					event: 		"IllegalMove",
					userName: 	cmd.userName,
					name: 		gameState.gameCreatedEvent.name,
					x: 			cmd.x,
					y: 			cmd.y,
					side: 		cmd.side,
					timeStamp: 	cmd.timeStamp
				}]
			}

			return [{
				id:      	cmd.id,
				event:     	"MoveMade",
				userName:  	cmd.userName,
				name:     	gameState.gameCreatedEvent.name,
				x:       	cmd.x,
				y:       	cmd.y,
				side:      	cmd.side,
				timeStamp: 	cmd.timeStamp 
			}]
	    }
	};

	return {
		executeCommand: function (cmd) {
			console.log("handlers: " + cmd);
			return handlers[cmd.comm](cmd);
		}
	};
};