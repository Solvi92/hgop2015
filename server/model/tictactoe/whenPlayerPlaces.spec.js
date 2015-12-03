var tictactoeCommandHandler = require('./tictactoeCommandHandler');
/* op = oparator = X or O */

describe('place command', function(){
  var given, when, then;

  it('should place operator op at location loc',function(){
    given= [];
    when={
      id:"1234",
      comm:"Place",
      userName : "Gulli",
      name:"TheFirstGame",
      op:"X",
      loc: [0, 0]
      timeStamp: Date()
    };
    then=[{
      id:"1234",
      event:"Placed",
      userName: "Gulli",
      timeStamp: Date()
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});