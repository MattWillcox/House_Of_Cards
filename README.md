Hello!

Welcome to the MSR House of Cards App.

Please take a moment to read this document as it'll help you run the program as smooth as possible.

-First, clone this file into your computer. 
-Run NPM install --save in your terminal to install all the dependencies.
-Run NPM run local in the Terminal to start the server.
-In two sepeerate browser types (IE,FIREFOX,CHROME,CHROME INCOGNITO) connect to the host site at localhost:8080.
-login as a user of your choice, and select the appropriate game.

You'll notice a score board and player history board after login. These will update as the games are platyed.


War
1. each player draws a card facedown
2. reveal
3. if card is same, draw 4 card
4. larger card wins & takes opponent card(s)
5. Winner is decided on the user with the most points


GoofSpiel
1. each player can play for the revealed prize card deck with a card in their hand. Cards are compared and the player that plays the higher card # is awarded the prize card value. The values are added to their respective scores and when all cards are played, a winner is decided based on whoever has the higher score.
2. Users can't play more than 1 card than their opponent, so please wait while your opponent picks their card.

NPM Dependencies:
    "body-parser": "^1.15.2",
    "bootstrap": "^3.3.7",
    "cookie-parser": "1.4.3",
    "cookie-session": "^1.3.0",
    "dotenv": "^2.0.0",
    "ejs": "^2.4.1",
    "express": "^4.13.4",
    "jquery": "^3.2.1",
    "knex": "^0.11.7",
    "knex-logger": "^0.1.0",
    "morgan": "^1.7.0",
    "node-sass-middleware": "^0.9.8",
    "pg": "^6.0.2",
    "socket.io": "^2.0.3"
  
