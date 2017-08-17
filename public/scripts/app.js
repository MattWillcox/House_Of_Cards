$(() => {

  const cards = document.querySelectorAll('.playing-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(card => {
        card.classList.toggle('is-flipped')
      });
    });
  });

  $('.userButtonRow1').click(function(){
    $('.userButtonRow2').hide();
    $('.userButtonRow3').hide();
    $('.userButtonRow4').hide();
    $('.playing-card').hide();
    $('.userButtonRow1').hide();
    $(".left").css('visibility', 'visible');
    $(".right").css('visibility', 'visible');
  });
  var counter =0;
  var counter2 = 0;
  $('.Game1').click(function(event){



    var windowSizeArray = [ "width=200,height=200",
                            "width=300,height=400,scrollbars=yes" ];
                   var url = $(this).attr("href");
                   var windowName = "popUp"+counter;//$(this).attr("name");
                   var windowSize = windowSizeArray[$(this).attr("rel")];
                    counter = counter+1;
                   window.open(url, windowName, windowSize);
      event.preventDefault();

  });

   $('.Game2').click(function(event){



    var windowSizeArray = [ "width=200,height=200",
                            "width=300,height=400,scrollbars=yes" ];
                   var url = $(this).attr("href");
                   var windowName = "popUp2"+counter2;//$(this).attr("name");
                   var windowSize = windowSizeArray[$(this).attr("rel")];
                    counter2 = counter2+1;
                   window.open(url, windowName, windowSize);
                   event.preventDefault();

  });

});


