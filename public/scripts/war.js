$(() => {

var socket = io.connect('http://localhost:8080/war');
var playerNum = Number(/userId=(\d+)/.exec(document.cookie)[1]);

$('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').on('mouseout', (event, eventObject) => {
  $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').addClass('titleLetter');
  setTimeout(function() {
    $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').removeClass('titleLetter');
  }, 1000)
});


function renderCardFaces(myHand){
var frontClasses = ['h1ace', 'h2two', 'h3three', 'h4four', 'h5five', 'h6six', 'h7seven', 'h8eight', 'h9nine', 'htten', 'hjjack', 'hqqueen', 'hkking','s1ace', 's2two', 's3three', 's4four', 's5five', 's6six', 's7seven', 's8eight', 's9nine', 'stten', 'sjjack', 'sqqueen', 'skking','c1ace', 'c2two', 'c3three', 'c4four', 'c5five', 'c6six', 'c7seven', 'c8eight', 'c9nine', 'ctten', 'cjjack', 'cqqueen', 'ckking','d1ace', 'd2two', 'd3three', 'd4four', 'd5five', 'd6six', 'd7seven', 'd8eight', 'd9nine', 'dtten', 'djjack', 'dqqueen', 'dkking'];
var handCard = $('.handCardPlayed');
var warCard = $('.warCardPlayed');
function sendThisCard() {
    socket.emit('cardplay', JSON.stringify({
    cookies: document.cookie
    }));
}
handCard.off('click');    // NOTE: if we ever need a second click handler on this, this line might be bad news
warCard.removeClass('back');
warCard.addClass('card' + frontClasses[myHand[myHand.length-1]].slice(0,1) + 'clickable' +
 frontClasses[myHand[myHand.length-1]].slice(1));
handCard.on('click', sendThisCard);
}

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
  }

  if (state.p1Score || state.p2score === undefined){
    windows.alert("opponent has left");
  }
})

socket.on('result', function(state){
  $.post('/gameResult', {player1: 1, player2: 2, winner: state});
})

socket.on('update state', function(data) {
  var state = JSON.parse(data);
  console.log("server says new state is", state);

  socket.on('yourTurn', function(data){
    $('.turnButton').empty();
    $('<div>').addClass('makeMove').text(data)
    .appendTo('.turnButton');
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
  if (playerNum === 1) {
    if(countNulls(state.p1Hand, state.p2Hand) >= -1){
      renderCardFaces(state.p1Hand);
    }
  } else {
    if(countNulls(state.p1Hand, state.p2Hand) <= 1){
      renderCardFaces(state.p2Hand);
    }
  }
})

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
})

})
