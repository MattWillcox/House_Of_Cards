$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users/"
  }).done((users) => {
    for(var i = 0; i < users.length; i++){
      console.log(users[i].name, "Rank: " + (i+1));
    }
  });
});


