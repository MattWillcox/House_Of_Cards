
$(() => {

  const cards = document.querySelectorAll('.playing-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(card => {
        card.classList.toggle('is-flipped')
      });
    });
  });

  $('button#btn-user-1').click(function(e){
    e.preventDefault();

    var userId = $(this).siblings("input").val();
    $.ajax({
      url: "/login",
      type: "POST",
      dataType: 'json',
      data: { userId: userId },
      success: function( data ) {
        console.log('Submitted');
      },
      error   : function( xhr, err ) {
        console.log('Error');
      }
    })
  })

  $('button#btn-user-2').click(function(e){
    e.preventDefault();

    var userId = $(this).siblings("input").val();
    $.ajax({
      url: "/login",
      type: "POST",
      dataType: 'json',
      data: { userId: userId },
      success: function( data ) {
        console.log('Submitted');
      },
      error   : function( xhr, err ) {
        console.log('Error');
      }
    })
  })

  $('.userButtonRow1').click(function(){
    $('.userButtonRow2').slideUp("slow");
    $('.userButtonRow3').slideUp("slow");
    $('.userButtonRow4').slideUp("slow");
    $('.playing-card').slideUp("slow");
    $('.userButtonRow1').slideUp("slow");
    $(".left").css('visibility', 'visible');
    $(".right").css('visibility', 'visible');
  });

   $('.userButtonRow2').click(function(){
    $('.userButtonRow1').slideUp("slow");
    $('.userButtonRow3').slideUp("slow");
    $('.userButtonRow4').slideUp("slow");
    $('.playing-card').slideUp("slow");
    $('.userButtonRow2').slideUp("slow");
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


                   var url = "/goofspiel/"
                   var windowName = "popUp2"+ counter2;//$(this).attr("name");
                   var windowSize = windowSizeArray[$(this).attr("rel")];
                    counter2 = counter2+1;
                   window.open(url,"_self");
                   event.preventDefault();

  });


});


