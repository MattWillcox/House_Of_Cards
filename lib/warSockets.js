module.exports = function(io, knex) {

var preShuffleState = {
  p1Hand: [],
  p2Hand: [],
  gameState: 'SHUFFLING',
  prizeDeck: [],
  prizeCard: 0,
  p1Score: 0,
  p2Score: 0,
  p1LastPlayed: 0,
  p2LastPlayed: 0,
};

function shuffleCards(state) {
  deck = Array.from(Array(52).keys());
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
  let newp1Hand = deck.slice(0, 25);
  let newp2Hand = deck.slice(26,51);
  console.log(newp1Hand);
  console.log(newp2Hand);
  const nextState = {
    gameState: 'SHUFFLED',
    p1Hand: newp1Hand,
    p2Hand: newp2Hand,
    prizeDeck: deck,
    p1Score: state.p1Score,
    p2Score: state.p2Score
  };

  return nextState;
}

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

function revealPrize(state) {
  const nextState = {
    gameState: 'REVEAL',
    p1Hand: state.p1Hand,
    p2Hand: state.p2Hand,
    prizeDeck: state.prizeDeck,
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
      p1Score: (state.p1Score + 1),
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
      p1Score: state.p1Score,
      p2Score: (state.p2Score + 1),
      p1LastPlayed: state.p1LastPlayed,
      p2LastPlayed: state.p2LastPlayed
    };
  } if(winner === 0){
    while (winner === 0){
      warp1Hand = state.p1Hand.splice(-3, 3);
      warp2Hand = state.p2Hand.splice(-3, 3);

      p1ComCard = state.p1Hand.pop();
      p2ComCard = state.p2Hand.pop();

      winner = p1ComCard - p2ComCard;
      if(winner > 0) {
        nextState = {
          gameState: 'REVEAL',
          p1Hand: state.p1Hand,
          p2Hand: state.p2Hand,
          prizeDeck: state.prizeDeck,
          p1Score: (state.p1Score + 4),
          p2Score: state.p2Score,
          p1LastPlayed: state.p1LastPlayed,
          p2LastPlayed: state.p2LastPlayed
        };
      } if(winner < 0){
        nextState = {
          gameState: 'PLAYING',
          p1Hand: state.p1Hand,
          p2Hand: state.p2Hand,
          prizeDeck: state.prizeDeck,
          p1Score: state.p1Score,
          p2Score: (state.p2Score + 4),
          p1LastPlayed: state.p1LastPlayed,
          p2LastPlayed: state.p2LastPlayed
        };
      }
    }
  }
  return nextState;
};

let initialState = shuffleCards(preShuffleState);

var roomCounter = 0;
var war = io.of('/war').on('connection', function(socket) {
  socket.join('room'+roomCounter);
  var sockets = io.in("room"+roomCounter);
  var currCount = Object.keys(sockets.sockets).length;
  if(currCount === 2){
    roomCounter++;
  };
  console.log('Socket connected');
  // war card section
  socket.on('cardplay', function(data) {
    var play2Card;
    var play1Card;
    let playerNumber = Number(move.cookies.slice(7));

    if(playerNumber === 1){
      if(countNulls(initialState.p1Hand, initialState.p2Hand) <= 0){
      }
      if(countNulls(initialState.p1Hand, initialState.p2Hand) >= 0){
          initialState.p1LastPlayed = initialState.p1LastPlayed.slice(-1,1);
          socket.emit('update state', JSON.stringify(initialState));
          war.to('room'+(roomCounter-1)).emit('yourTurn', " It is player 2's turn");
      }
    }
    if(playerNumber === 2) {
      if(countNulls(initialState.p1Hand, initialState.p2Hand) <= 0){
        initialState.p2LastPlayed = initialState.p1LastPlayed.slice(-1,1);
        socket.emit('update state', JSON.stringify(initialState));
        war.to('room'+(roomCounter-1)).emit('yourTurn', " It is player 1's turn");
      }
      if(countNulls(initialState.p1Hand, initialState.p2Hand) >= 0){
      }
    }
    if(countNulls(initialState.p1Hand, initialState.p2Hand) == 0){
      initialState = compareCards(initialState, initialState.p1LastPlayed, initialState.p2LastPlayed);
      initialState = revealPrize(initialState);
      war.to('room'+(roomCounter-1)).emit('yourTurn', "Make a move");

      if(!(initialState.p1Hand || initialState.p2Hand)){
        war.to('room'+(roomCounter-1)).emit("gameOver", JSON.stringify(initialState));
        let result = initialState.p1Score - initialState.p2Score;
        if(result > 0){
          socket.emit("result", 1);
        }
        if(result < 0){
          socket.emit('result', 2);
        }
        if(result === 0){
          socket.emit('result', 0);
        }
      }
    }
  })
})
}
