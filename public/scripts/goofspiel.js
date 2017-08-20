 $(() => {

  var socket = io.connect('http://localhost:8080/');
  var playerNum = Number(/userId=(\d+)/.exec(document.cookie)[1]);


  renderCardFaces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

  $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').on('mouseout', (event, eventObject) => {
    $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').addClass('titleLetter');
    setTimeout(function() {
      $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').removeClass('titleLetter');
    }, 1000)
  });


    function cardPlay(index) {
      console.log("cardplay.  emitting to server.");
      socket.emit('cardplay', JSON.stringify({
        index: index,
        cookies: document.cookie
      }));
    }
    socket.on('load', function(state) {
          var frontClasses = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
      var state = JSON.parse(state);
       $('.card.stack').empty();
      $('<div>').addClass('card spades clickable ' + frontClasses[state.prizeCard - 1])
      .appendTo('.card.stack');
    });

    socket.on('updatePrizeCard' , function(state){

      console.log("in updatePrizeCard");
      var frontClasses = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
      var state = JSON.parse(state);
      $('.card.stack').empty();
      $('<div>').addClass('card spades clickable ' + frontClasses[state.prizeCard - 1])
      .appendTo('.card.stack');

      $('.userScore').text("Player 1:" + state.p1Score)
      $('.opponentScore').text("Player 2:" + state.p2Score)

    });

    socket.on('gameOver', function(state){
      var state = JSON.parse(state);
      $('.scoreboard').empty();
      if (state.p1Score > state.p2Score){
        $('<div>').addClass('p1Winner').text("P1 WINS CONGRATS")
        .appendTo('.scoreboard');
      } if ( state.p2Score > state.p1Score){
        $('<div>').addClass('p2Winner').text("P2 WINS CONGRATS")
        .appendTo('.scoreboard');
      } if ( state.p1Score == state.p2Score){
        $('<div>').addClass('TIE').text("TIED")
        .appendTo('.scoreboard');
      };
        if (state.p1Score || state.p2score === undefined){
        windows.alert("opponent has left");
        }
    });

    socket.on('result', function(state){
      $.post('/gameResult', {player1: 1, player2: 2, winner: state});
    })

    socket.on('update state', function(data) {
      var state = JSON.parse(data);
      console.log("server says new state is", state);

    socket.on('yourTurn', function(data){

      $('.turnButton').empty();
      $('<div>').addClass('makeMove').text(data)
      .appendTo('.turnButton')
    });

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
      console.log('outside', playerNum);
      console.log("difference", countNulls(state.p1Hand, state.p2Hand));
      if (playerNum === 1) {
        if(countNulls(state.p1Hand, state.p2Hand) >= -1){
          console.log("p1 cards");
          renderCardFaces(state.p1Hand);
        }
      } else {
        console.log('inside', playerNum);
        if(countNulls(state.p1Hand, state.p2Hand) <= 1){
          console.log("p2 cards");
        renderCardFaces(state.p2Hand);
      }
    }

    });

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

    function updateState(data) {
      // update ui based on data object
      //$().appendChild();
      console.log(data);
    }

    function renderCardFaces(myHand){
      var frontClasses = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
      for (let i = 0; i < 13; i++) {
        var cardId = '#mine' + i;
        var card = $(cardId);
        function sendThisCard() {
          cardPlay(i);
        }
        card.off('click');    // NOTE: if we ever need a second click handler on this, this line might be bad news
        if (myHand[i]) {
          card.removeClass('back');
          card.addClass('hearts clickable ' + frontClasses[i]);
          card.on('click', sendThisCard);
        } else {
          card.addClass('back');
          card.removeClass('hearts clickable ' + frontClasses[i]);
        }
      }
    }
});


$(".btn-default").click(function() {
var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;' +
            'expires=Thu, 01-Jan-1970 00:00:01 GMT;' +
            'path=' + '/;' +
            'domain=' + window.location.host + ';' +
            'secure=;';
    }
});
