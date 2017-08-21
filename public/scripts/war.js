 $(() => {

  var socket = io.connect('http://localhost:8080/war');
  var playerNum = Number(/userId=(\d+)/.exec(document.cookie)[1]);

  //renderCardFaces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);


  // header letters
  // $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').on('mouseout', (event, eventObject) => {
  //   $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').addClass('titleLetter');
  //   setTimeout(function() {
  //     $('.hh, .o1, .u1, .s1, .e1, .o2, .f1, .c1, .a1, .r1, .d1, .s2').removeClass('titleLetter');
  //   }, 10 00)
  // });


  $('.draw-card').click(function() {
    console.log('drew card')
    socket.emit('drawCard');
  });

  socket.on('cardsPlayed', function(handOne, handTwo) {
    console.log("player one: ", handOne);
    console.log('player two: ', handTwo);
  })

  $(".btn-default").click(function() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=' + window.location.host + '; secure=;';
    }
  });
});
