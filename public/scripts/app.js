
$(() => {
  var state = { userId: null }

  const cards = document.querySelectorAll('.playing-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(card => {
        card.classList.toggle('is-flipped')
      });
    });
  });

  var socket = io.connect('http://localhost:8080/');


  function cardPlay(index) {
    console.log("cardplay.  emitting to server.");
    socket.emit('cardplay', JSON.stringify({
      index: index,
      player: state.userId
    }));
  }

  socket.on('update state', function(data) {
    var state = JSON.parse(data);
    console.log("server says new state is", state);
    renderCardFaces(state.p1Hand);        // TODO: not always p1hand!!  maybe I'm not p1!
  });

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

  renderCardFaces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);


  $('.userButtonRow1').click(function(){
    state.userId = 1;
    $('.userButtonRow2').hide("slow");
    $('.userButtonRow3').hide("slow");
    $('.userButtonRow4').hide("slow");
    $('.playing-card').hide("slow");
    $('.userButtonRow1').hide("slow");
    $(".left").css('visibility', 'visible');
    $(".right").css('visibility', 'visible');
  });
   $('.userButtonRow2').click(function(){
    state.userId = 2
    $('.userButtonRow1').hide("slow");
    $('.userButtonRow3').hide("slow");
    $('.userButtonRow4').hide("slow");
    $('.playing-card').hide("slow");
    $('.userButtonRow1').hide("slow");
    $(".left").css('visibility', 'visible');
    $(".right").css('visibility', 'visible');
  });
  var counter =0;
  var counter2 =0;
  $('#Game1').click(function(event){
    event.preventDefault();

    var windowSizeArray = [ "width=200,height=200",
                            "width=300,height=400,scrollbars=yes" ];
                   var url = "http://www.google.com";
                   var windowName = "popUp"+counter;//$(this).attr("name");
                   var windowSize = windowSizeArray[$(this).attr("rel")];
                   counter = counter + 1;
                   window.open(url, windowName, windowSize);
                   console.log(counter);
                   event.preventDefault();



  });

   $('#Game2').click(function(event){



    var windowSizeArray = [ "width=200,height=200",
                            "width=300,height=400,scrollbars=yes" ];


                   var url = "/goofspiel?user_id="+ state.userId
                   var windowName = "popUp2"+ counter2;//$(this).attr("name");
                   var windowSize = windowSizeArray[$(this).attr("rel")];
                    counter2 = counter2+1;
                   window.open(url,"_self");
                   event.preventDefault();

  });

});


