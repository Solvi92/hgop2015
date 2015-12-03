module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];
  var board = [["","",""]["","",""]["","",""]];

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
          
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "Place": function (cmd) {
      {
        board[cmd.loc[0]][cmd.loc[1]] = cmd.op;
        return [{
          id: cmd.id,
          event: "Placed",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
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
