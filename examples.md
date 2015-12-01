Preparing for implementing unit tests.

Place(0,1,X) = player 1 just placed an X in index 0,1
Placed(0,1,X) = player 1 has already placed an X in index 0,1

Error: return message = illegal move was made return message.

-------------------------------------------------------------------
1. Failure:

/* If user X just did a place he has to wait for user O to place, 
   only then user 1 can move again we want nothing to happen */
Given [ Placed(0,0,X) ]
When  [ Place(0,1,X) ]
Then  [ Error: X played twice ]

/* If a user tries place in an index that is already 
   occupied we want nothing to happen */
Given [ Placed(0,0,X) ]
When  [ Place(0,0,O) ]
Then  [ Error: twice placed in 0,0 ]

/* User X has to be the first one to play */
Given [ Nothing has happend ]
When  [ Place(0,0,O) ]
Then  [ Error: user O tried to play first ]

/* index has to be 0, 1 or 2 */
Given [  ]
When  [ Place(3,3,X) ]
Then  [ Error: user is out of bounce ]

/* index has to be 0, 1 or 2 */
Given [  ]
When  [ Place(3,3,X) ]
Then  [ Error: user is out of bounce ]

/* Game has to end if a player has won */
Given [ X Won ]
When  [ Place(1,1,O) ]
Then  [ Error: game has finised, restart game ]

-------------------------------------------------------------------
2. Winning scenarios:

/* hrizontal winning */
Given [ Placed(1,0,X), Placed(1,1,X) ]
When  [ Place(1,2,X) ]
Then  [ X Won ]

/* diagonal winning */
Given [ Placed(0,0,X), Placed(1,1,X) ]
When  [ Place(2,2,X) ]
Then  [ X Won ]

/* vertical winning */
Given [ Placed(0,0,X), Placed(0,1,X) ]
When  [ Place(0,2,X) ]
Then  [ X Won ]

-------------------------------------------------------------------
3. Draw scenarios:

/* when 9 Place have been made and there is no winner,
   then there is a draw */
Given [ Placed(0,0,X), Placed(0,1,O), Placed(0,0,X), 
		Placed(0,1,O), Placed(0,0,O), Placed(0,1,X),
		Placed(0,0,X), Placed(0,1,X) ]
When  [ Place(0,0,O) ]
Then  [ Draw ]
