var _ = require('lodash');

module.exports = function commandHandler(events) {
	var gameState = {
		gameCreatedEvent : events[0],
		board : [["", "", ""], ["", "", ""], ["", "", ""]],
		firstMoveMade : false,
		moveCounter : 0
	};

	var eventHandlers = {
		"MoveMade" : function(event) {
			gameState.board[event.x][event.y] = event.side;
			gameState.firstMoveMade = true;
			gameState.moveCounter++;
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
					gameId: 	cmd.gameId,
					event: 		"GameCreated",
					userName: 	cmd.userName,
					name: 		cmd.name,
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
					gameId: 		cmd.gameId,
					event: 			"GameJoined",
					userName:   	cmd.userName,
					otherUserName: 	gameState.gameCreatedEvent.userName,
					timeStamp:  	cmd.timeStamp
				}];
			}
	    },
	    "MakeMove" : function (cmd) {

	    	/* Check illegal moves */
			if(gameState.board[cmd.x][cmd.y] !== "" ||
				(cmd.side === "O" && !gameState.firstMoveMade)) {
				return [{
					id: 		cmd.id,
					gameId: 	cmd.gameId,
					event: 		"IllegalMove",
					userName: 	cmd.userName,
					name: 		gameState.gameCreatedEvent.name,
					x: 			cmd.x,
					y: 			cmd.y,
					side: 		cmd.side,
					timeStamp: 	cmd.timeStamp
				}]
			}

			gameState.board[cmd.x][cmd.y] = cmd.side;
			var win = false;
			/* Check if someone Won */
    		for (var j = 0; j < 3; j++) {
    			/* horizontaly */
    			if(gameState.board[j][0] !== "" &&
    				gameState.board[j][0] === gameState.board[j][1] &&
    				gameState.board[j][0] === gameState.board[j][2]) {
					win = true;
    			}

    			/* diagonaly */
    			if(gameState.board[0][j] !== "" &&
    				gameState.board[0][j] === gameState.board[1][j] &&
    				gameState.board[0][j] === gameState.board[2][j]) {
    				win = true;
    			}
    		}

    		/* verticaly */	
			if(gameState.board[0][0] !== "" &&
				gameState.board[0][0] === gameState.board[1][1] &&
				gameState.board[0][0] === gameState.board[2][2]) {
				win = true;
			}
			/* verticaly in the other direction */
			if(gameState.board[0][2] !== "" &&
				gameState.board[0][2] === gameState.board[1][1] &&
				gameState.board[0][2] === gameState.board[2][0]) {
				win = true;
			}
    		if(win) {
    			/* Someone won! */
    			return [{
					id: 		cmd.id,
					gameId: 	cmd.gameId,
					event: 		"GameWon",
					userName: 	cmd.userName,
					name: 		gameState.gameCreatedEvent.name,
					x:       	cmd.x,
					y:       	cmd.y,
					side:      	cmd.side,
					timeStamp: 	cmd.timeStamp
				}];
    		}
			/* Check if there is a draw */
			gameState.moveCounter++;
    		if(gameState.moveCounter > 8) {
    			return [{
					id:      	cmd.id,
					gameId: 	cmd.gameId,
					event:     	"Draw",
					userName: 	cmd.userName,
					name:     	gameState.gameCreatedEvent.name,
					x:       	cmd.x,
					y:       	cmd.y,
					side:      	cmd.side,
					timeStamp: 	cmd.timeStamp 
				}] 
    		}

    		/*Someone just moved and it's ok*/
			return [{
				id:      	cmd.id,
				gameId: 	cmd.gameId,
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
			return handlers[cmd.comm](cmd);
		}
	};
};