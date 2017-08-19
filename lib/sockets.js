module.exports = function(io, knex) {

  var preShuffleState = {
      p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      gameState: 'SHUFFLING',
      prizeDeck: [],
      prizeCard: 0,
      p1Score: 0,
      p2Score: 0,
      p1LastPlayed: 0,
      p2LastPlayed: 0,
    };


function shuffleCards(state) {
  deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  var m = deck.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }

  let prizeCard = deck.pop();
  const nextState = {
    gameState: 'SHUFFLED',
    p1Hand: state.p1Hand,
    p2Hand: state.p2Hand,
    prizeDeck: deck,
    prizeCard: prizeCard,
    p1Score: state.p1Score,
    p2Score: state.p2Score
  };

  return nextState;
}

  let initialState = shuffleCards(preShuffleState);

  io.on('connection', function(client) {
    console.log('Client connected...');
    client.emit('load', JSON.stringify(initialState));
    client.on('disconnect', function () {

    });

    //home screen card section

    client.on('identify', function(data) {
      var data_o = JSON.parse(data);
      var user_id = data_o.user_id;
      var game_id = data_o.game_id;
      if (!user_id || !game_id) {
        // freak out, because the client is being a dumbass
      }
      client.user_id = user_id;
      client.game_id = game_id;
      // TODO: also put this connection in the registry of connections for game_id
    })


    function countNulls(p1, p2) {
      let p1cards = 0;
      let p2cards = 0;

      for(card in p1){
        if(p1[card] !== null){
          p1cards++;
        }

      }
      for(card in p2){
        if(p2[card] !== null){
          p2cards++;
        }
      }
      return p1cards - p2cards;
    }
    // goofspiel card section
    client.on('cardplay', function(data) {



      var play2Card;
      var play1Card;
      const move = JSON.parse(data);
        let playerNumber = Number(move.cookies.slice(7));

        if(playerNumber === 1){
          if(countNulls(initialState.p1Hand, initialState.p2Hand) <= 0){
            console.log("p wait please.");
          } if(countNulls(initialState.p1Hand, initialState.p2Hand) >= 0){
              initialState.p1LastPlayed = initialState['p' + playerNumber + 'Hand'][move.index];
              console.log("Play from user with cookie: ", move.cookies)
              console.log("previous state:", initialState);
              initialState['p' + 1 + 'Hand'][move.index] = null;
              console.log("new state:", initialState);
              client.emit('update state', JSON.stringify(initialState));
              io.sockets.emit('yourTurn', " It is player 2's turn");
          }
        } if(playerNumber === 2) {
            if(countNulls(initialState.p1Hand, initialState.p2Hand) <= 0){
              initialState.p2LastPlayed = initialState['p' + playerNumber + 'Hand'][move.index];
              console.log("Play from user with cookie: ", move.cookies)
              console.log("previous state:", initialState);
              initialState['p' + 2 + 'Hand'][move.index] = null;
              console.log("new state:", initialState);
              client.emit('update state', JSON.stringify(initialState));
              io.sockets.emit('yourTurn', " It is player 1's turn");

            } if(countNulls(initialState.p1Hand, initialState.p2Hand) >= 0){
              console.log("p wait please.");
            }

        }
        if(countNulls(initialState.p1Hand, initialState.p2Hand) == 0){

          initialState = compareCards(initialState, initialState.p1LastPlayed, initialState.p2LastPlayed);
          initialState = revealPrize(initialState);
          io.sockets.emit('yourTurn', " It's both of your turn" )

          if(!initialState.prizeCard){
            console.log('GAME OVER');
            io.sockets.emit("gameOver", JSON.stringify(initialState))
          } else {
            io.sockets.emit("updatePrizeCard", JSON.stringify(initialState))
          }

          console.log(initialState);
          }



        })
    });
  }

function revealPrize(state) {

  const newPrizeCard = state.prizeDeck.pop();

  const nextState = {
  gameState: 'REVEAL',
  p1Hand: state.p1Hand,
  p2Hand: state.p2Hand,
  prizeDeck: state.prizeDeck,
  prizeCard: newPrizeCard,
  p1Score: state.p1Score,
  p2Score: state.p2Score,
  p1LastPlayed: state.p1LastPlayed,
  p2LastPlayed: state.p2LastPlayed
  };

  return nextState;
}

function compareCards(state, card1, card2) {
  const winner = Number(card1) - Number(card2);
  let nextState = {};
  if(winner > 0) {
    let p1ScoreNew = Number(state.p1Score) + Number(state.prizeCard);
    nextState = {
      gameState: 'REVEAL',
      p1Hand: state.p1Hand,
      p2Hand: state.p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: p1ScoreNew,
      p2Score: state.p2Score,
      p1LastPlayed: state.p1LastPlayed,
      p2LastPlayed: state.p2LastPlayed
    };
  } if(winner < 0){
    let p2ScoreNew = Number(state.p2Score) + Number(state.prizeCard);
    nextState = {
      gameState: 'PLAYING',
      p1Hand: state.p1Hand,
      p2Hand: state.p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: p2ScoreNew,
      p1LastPlayed: state.p1LastPlayed,
      p2LastPlayed: state.p2LastPlayed
    };
  } if(winner === 0){
    nextState = {
      gameState: 'PLAYING',
      p1Hand: state.p1Hand,
      p2Hand: state.p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: state.p2Score,
      p1LastPlayed: state.p1LastPlayed,
      p2LastPlayed: state.p2LastPlayed
    };
  }
  console.log(nextState);
  return nextState;
};




