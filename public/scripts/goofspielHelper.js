const initialState = {
  gameState: 'SHUFFLING'
  p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  prizeDeck: [],
  prizeCard: 0,
  p1Score: 0,
  p2Score: 0
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

  const nextState = {
  gameState: 'SHUFFLED'
  p1Hand: state.p1Hand,
  p2Hand: state.p2Hand.
  prizeDeck: deck,
  prizeCard: state.prizeCard,
  p1Score: state.p1Score,
  p2Score: state.p2Score
  };

  return nextState;
}

function revealPrize(state, prizeDeck) {

  const prizeCard = prizeDeck.pop();

  const nextState = {
  gameState: 'REVEAL'
  p1Hand: state.p1Hand,
  p2Hand: state.p2Hand.
  prizeDeck: prizeDeck,
  prizeCard: prizeCard,
  p1Score: state.p1Score,
  p2Score: state.p2Score
  };

  return nextState;
}

function compareCards(state, card1, card2) {

  p1Hand = state.p1Hand.filter(function( obj ) {
  return obj !== card1;

  p2Hand = state.p2Hand.filter(function( obj ) {
  return obj !== card2;

  const winner = card1 - card2;

  if(winner > 0){

    p1Score = state.p1Score + state.prizeCard;
    const nextState = {
      gameState: 'REVEAL'
      p1Hand: p1Hand,
      p2Hand: p2Hand.
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: p1Score,
      p2Score: state.p2Score
    };
  } if(winner < 0){

    p2Score = state.p2Score + state.prizeCard;
    const nextState = {
      gameState: 'PLAYING'
      p1Hand: p1Hand,
      p2Hand: p2Hand.
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: p2Score;
    };
  } else {
    const nextState = {
      gameState: 'PLAYING'
      p1Hand: p1Hand,
      p2Hand: p2Hand.
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: state.p2Score
    };
  }

  return nextState;
}

module.exports = {
  shuffleCards,
  revealPrize,
  compareCards
}
