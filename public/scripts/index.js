$(() => {
  $('.login').click(() => {
    let userResult = {};
    $.getJSON("/api/users").done((users) => {
      var playerNum = Number(/userId=(\d+)/.exec(document.cookie)[1]);
      for(user of users){
        $("<div>").text('Rank:' + (users.indexOf(user) + 1)+ " " + user.name + " Wins: " + user.wins).appendTo($(".whosOnlineBody"))
        $('<a>').attr('href', '/api/users/gamesPlayed/' + user.name).appendTo($(".whosOnlineBody")).text('Game Log');
        if(user.name === 'User'+playerNum){
          $('.userInformationHead').text('Username: ' + user.name);
          $('.userInformationBody').text('Rank: ' + (users.indexOf(user) + 1) + ' Wins: ' + user.wins);
        }
      }
    });
  })
});


