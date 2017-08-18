module.exports = function(io, knex) {

  io.on('connection', function(client) {
    console.log('Client connected...');
    client.emit('news', 'news');


    // console.log('clientttt!', client);
    // setTimeout(()=>{console.log('\n\nMORE CLIENT\n\n', client);}, 2000);

    client.use((packet, next) => {
      console.log("A THING");
      next();
    });

    client.on('disconnect', function () {
      console.log('user disconnected; screw him/her/them/it');
    });



    //home screen card section

    var initialState = {
      p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      gameState: 'SHUFFLING',
      prizeDeck: [],
      prizeCard: 0,
      p1Score: 0,
      p2Score: 0
    };


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



    // io.on('connection', function (socket) {
    //   socket.emit('news', { hello: 'world' });
    //   socket.on('my other event', function (data) {
    //     console.log(data);
    //   });
    // });

    // client.on('update state', function() { //updating emitted data
    //   console.log("I worked");
    //   knex.select('games_goofspiel')
    //   .insert({user1_id : client.user_id})

    // })

    // client.on('play card', function(data) {
    //   if (!client.user_id || !client.game_id) {
    //     // we don't know WTF this is, so nuts to them.  GOOD DAY SIR.
    //     console.log("what is this preposterous nonsense!  good day, sir!");
    //     return;
    //   }
    //   const move = JSON.parse(data);

    //   state['player' + move.player + 'Hand'].splice(move.index, 1);
    //   console.log(state);
    //   client.emit('update state', state);
    // });

    // goofspiel card section

    client.on('cardplay', function(data) {
      const move = JSON.parse(data);
      console.log('nobody likes U2: ', move);
      console.log("previous state:", initialState);
      initialState['p' + move.player + 'Hand'][move.index] = null;
      console.log("new state:", initialState);
      client.emit('update state', JSON.stringify(initialState));
      if (! initialState['p' + move.player + 'Hand'].some((x)=>x)) {
        console.log("GAME OVER MAN");
      }
    });
  });
}

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
  gameState: 'SHUFFLED',
  p1Hand: state.p1Hand,
  p2Hand: state.p2Hand,
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
  gameState: 'REVEAL',
  p1Hand: state.p1Hand,
  p2Hand: state.p2Hand,
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
  });

  p2Hand = state.p2Hand.filter(function( obj ) {
  return obj !== card2;
  });

  const winner = card1 - card2;

  if(winner > 0) {

    p1Score = state.p1Score + state.prizeCard;
    const nextState = {
      gameState: 'REVEAL',
      p1Hand: p1Hand,
      p2Hand: p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: p1Score,
      p2Score: state.p2Score
    };
  } if(winner < 0){

    p2Score = state.p2Score + state.prizeCard;
    const nextState = {
      gameState: 'PLAYING',
      p1Hand: p1Hand,
      p2Hand: p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: p2Score
    };
  } else {
    const nextState = {
      gameState: 'PLAYING',
      p1Hand: p1Hand,
      p2Hand: p2Hand,
      prizeDeck: state.prizeDeck,
      prizeCard: state.prizeCard,
      p1Score: state.p1Score,
      p2Score: state.p2Score
    };
  }


  return nextState;
};




